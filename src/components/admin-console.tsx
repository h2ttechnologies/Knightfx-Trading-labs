"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, ChevronRight, CloudUpload, FileJson2, Inbox, LogOut, RefreshCw, Save, Shield, Trash2, X } from "lucide-react";

type TableKey = "courses" | "market_posts" | "evidence" | "partners" | "site_settings" | "contact_submissions";
type Row = Record<string, unknown>;

const collections: { id: TableKey; label: string; summary: string; starter: Row }[] = [
  { id: "courses", label: "Courses", summary: "Curriculum outlines and lesson status.", starter: { slug: "new-learning-path", number: "07", title: "New learning path", description: "", level: "All levels", topics: [], image_url: null, status: "draft", featured: false, position: 7 } },
  { id: "market_posts", label: "Market posts", summary: "Educational articles and market room content.", starter: { slug: "new-article", title: "New article", category: "Trading education", excerpt: "", content: [], featured_image_url: null, author: "KnightFX Trading Labs", reading_time: "4 min read", status: "draft", featured: false } },
  { id: "evidence", label: "Results archive", summary: "Evidence stays private until verified and published.", starter: { title: "Milestone title", description: "", category: "Trader milestones", result_owner: "founder", evidence_url: "", verification_reference: null, verified: false, published: false, achieved_at: null } },
  { id: "partners", label: "Partners", summary: "Verified partner records, codes and links.", starter: { name: "Partner name", category: "prop_firm", description: "", logo_url: null, affiliate_code: null, discount: null, affiliate_url: null, status: "draft", featured: false } },
  { id: "site_settings", label: "Site settings", summary: "Public brand details and community destinations.", starter: { key: "social_links", value: { discord: "", telegram: "", instagram: "", youtube: "", whatsapp: "", email: "" }, public: true } },
  { id: "contact_submissions", label: "Contact inbox", summary: "Read enquiries delivered to Supabase.", starter: {} },
];

function displayName(row: Row) {
  return String(row.title ?? row.key ?? row.name ?? row.slug ?? row.email ?? "Untitled record");
}

export function AdminConsole() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = useMemo(() => url && anonKey ? createBrowserClient(url, anonKey) : null, [url, anonKey]);
  const [view, setView] = useState<TableKey>("courses");
  const [sessionEmail, setSessionEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [draft, setDraft] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [assetUrl, setAssetUrl] = useState("");

  const activeCollection = collections.find((item) => item.id === view)!;

  const loadRows = useCallback(async () => {
    if (!supabase || !isAdmin) return;
    const { data, error } = await supabase.from(view).select("*").limit(100);
    if (error) setStatus(`Could not load ${activeCollection.label.toLowerCase()}: ${error.message}`);
    else setRows((data ?? []) as Row[]);
  }, [supabase, isAdmin, view, activeCollection.label]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      const user = data.session?.user;
      if (user?.app_metadata?.role === "admin") {
        setSessionEmail(user.email ?? "Administrator");
        setIsAdmin(true);
      } else if (user) {
        await supabase.auth.signOut();
        if (active) setStatus("This account does not have the KnightFX administrator role.");
      }
      if (active) setCheckingAuth(false);
    });
    return () => { active = false; };
  }, [supabase]);
  useEffect(() => {
    if (!supabase || !isAdmin) return;
    let active = true;
    void supabase.from(view).select("*").limit(100).then(({ data, error }) => {
      if (!active) return;
      if (error) setStatus(`Could not load ${activeCollection.label.toLowerCase()}: ${error.message}`);
      else setRows((data ?? []) as Row[]);
    });
    return () => { active = false; };
  }, [supabase, isAdmin, view, activeCollection.label]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setStatus("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setStatus("Sign in failed. Check the account details and try again.");
    else if (data.user?.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setStatus("This account is not assigned the KnightFX administrator role.");
    } else {
      setSessionEmail(data.user.email ?? "Administrator"); setIsAdmin(true); setStatus("");
    }
    setBusy(false);
  }

  function beginNew() {
    setSelected(null);
    setDraft(JSON.stringify(activeCollection.starter, null, 2));
    setStatus("");
  }

  function beginEdit(row: Row) {
    setSelected(row);
    setDraft(JSON.stringify(row, null, 2));
    setStatus("");
  }

  async function saveRecord() {
    if (!supabase || view === "contact_submissions") return;
    setBusy(true); setStatus("");
    let payload: Row;
    try {
      payload = JSON.parse(draft) as Row;
      if (!payload || Array.isArray(payload) || typeof payload !== "object") throw new Error("Record must be a JSON object.");
      if (view === "site_settings" && (!payload.key || !payload.value)) throw new Error("Settings need a key and value.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please enter valid JSON."); setBusy(false); return;
    }

    const identity = view === "site_settings" ? "key" : "id";
    const recordId = selected?.[identity];
    const fields = { ...payload };
    delete fields[identity];
    const save = recordId
      ? await supabase.from(view).update({ ...fields, ...(view !== "evidence" ? { updated_at: new Date().toISOString() } : {}) }).eq(identity, recordId)
      : view === "site_settings"
        ? await supabase.from(view).upsert(payload)
        : await supabase.from(view).insert(payload);

    if (save.error) setStatus(`Could not save this record: ${save.error.message}`);
    else { setStatus("Record saved."); setSelected(null); setDraft(""); await loadRows(); }
    setBusy(false);
  }

  async function deleteRecord(row: Row) {
    if (!supabase || view === "contact_submissions") return;
    const identity = view === "site_settings" ? "key" : "id";
    if (!window.confirm(`Delete “${displayName(row)}”? This cannot be undone.`)) return;
    setBusy(true);
    const { error } = await supabase.from(view).delete().eq(identity, row[identity]);
    setStatus(error ? `Could not delete this record: ${error.message}` : "Record deleted.");
    if (!error) { setSelected(null); setDraft(""); await loadRows(); }
    setBusy(false);
  }

  async function markRead(row: Row) {
    if (!supabase) return;
    const { error } = await supabase.from("contact_submissions").update({ read_at: new Date().toISOString() }).eq("id", row.id);
    if (error) setStatus(`Could not update enquiry: ${error.message}`);
    else { setStatus("Enquiry marked as read."); await loadRows(); }
  }

  async function uploadAsset(file?: File) {
    if (!supabase || !file) return;
    if (file.size > 12 * 1024 * 1024) { setStatus("Choose an image under 12 MB."); return; }
    if (!file.type.startsWith("image/")) { setStatus("Choose an image file."); return; }
    setBusy(true); setStatus("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
    const path = `uploads/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: false, contentType: file.type });
    if (error) setStatus(`Upload failed: ${error.message}`);
    else {
      const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
      setAssetUrl(data.publicUrl);
      setStatus("Image uploaded. Copy its public URL into the matching content field.");
    }
    setBusy(false);
  }

  async function copyAssetUrl() {
    if (!assetUrl) return;
    await navigator.clipboard.writeText(assetUrl);
    setStatus("Image URL copied.");
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setRows([]); setSelected(null); setDraft(""); setIsAdmin(false); setStatus("Signed out.");
  }

  if (supabase && checkingAuth) return <AdminFrame><div className="admin-message"><RefreshCw className="spin" size={18} /> Checking administrator access…</div></AdminFrame>;

  if (!supabase) return <AdminFrame><div className="admin-setup"><Shield size={28} /><span className="eyebrow">ADMIN / SETUP REQUIRED</span><h1>Connect the content workspace.</h1><p>Add the Supabase project URL and public anon key to the deployment environment. Apply <code>supabase/schema.sql</code> before signing in.</p><Link className="button button-outline" href="/#home">Return to website <ChevronRight size={15} /></Link></div></AdminFrame>;

  if (!isAdmin) return (
    <AdminFrame>
      <div className="admin-login">
        <div className="admin-login-mark"><Shield size={22} /><span>AUTHORIZED ACCESS ONLY</span></div>
        <h1>Content<br /><em>workspace.</em></h1>
        <p>Sign in using an account assigned the KnightFX administrator role.</p>
        <form onSubmit={signIn} className="contact-form">
          <label>Email address<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="button button-silver" type="submit" disabled={busy}>Sign in <ChevronRight size={15} /></button>
          {status && <p className="form-feedback error" role="alert">{status}</p>}
        </form>
        <p className="admin-security-note">Access is enforced again by Supabase row level security. No public account creation is enabled.</p>
      </div>
    </AdminFrame>
  );

  return (
    <AdminFrame>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand"><span>KX</span><div><strong>KNIGHTFX</strong><small>CONTENT WORKSPACE</small></div></div>
          <span className="admin-nav-label">PUBLISHING</span>
          {collections.map((collection) => {
            const Icon = collection.id === "contact_submissions" ? Inbox : FileJson2;
            return <button key={collection.id} className={view === collection.id ? "admin-nav-item active" : "admin-nav-item"} onClick={() => { setView(collection.id); setSelected(null); setDraft(""); setStatus(""); }}><Icon size={15} />{collection.label}<ChevronRight size={13} /></button>;
          })}
          <div className="admin-sidebar-bottom"><span>SIGNED IN</span><strong>{sessionEmail}</strong><button onClick={signOut}><LogOut size={14} /> Sign out</button></div>
        </aside>
        <section className="admin-main">
          <div className="admin-topbar"><div><span className="eyebrow"><i /> ADMIN / {activeCollection.label.toUpperCase()}</span><h1>{activeCollection.label}</h1></div><button className="admin-refresh" onClick={() => void loadRows()} disabled={busy}><RefreshCw size={14} className={busy ? "spin" : ""} /> Refresh</button></div>
          <p className="admin-summary">{activeCollection.summary}</p>
          {status && <div className="admin-alert" role="status">{status}<button onClick={() => setStatus("")} aria-label="Dismiss message"><X size={15} /></button></div>}

          {view !== "contact_submissions" && <div className="admin-workbench">
            <div className="admin-record-list"><div className="admin-list-heading"><span>RECORDS / {rows.length}</span><button className="button button-outline" onClick={beginNew}>New record <ChevronRight size={14} /></button></div>
              {rows.length === 0 ? <div className="admin-empty">No records yet.<br /><small>Create a draft record to get started.</small></div> : rows.map((row) => <button key={String(row.id ?? row.key)} className={selected === row ? "admin-record active" : "admin-record"} onClick={() => beginEdit(row)}><span>{displayName(row)}</span><small>{String(row.status ?? (row.published ? "published" : row.public ? "public setting" : "draft"))}</small></button>)}
            </div>
            <div className="admin-editor"><div className="admin-editor-title"><div><span>JSON CONTENT EDITOR</span><small>{selected ? "Edit selected record" : "Create a new record"}</small></div>{selected && <button className="icon-button danger" onClick={() => void deleteRecord(selected)} aria-label="Delete record"><Trash2 size={15} /></button>}</div>
              {!draft ? <div className="admin-empty editor-empty">Select a record or create one to edit its content.</div> : <><textarea className="json-editor" spellCheck={false} value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Content JSON" /><div className="admin-editor-foot"><span>Use valid JSON. Drafts stay unpublished.</span><button className="button button-silver" onClick={() => void saveRecord()} disabled={busy}><Save size={14} /> Save record</button></div></>}
            </div>
          </div>}

          {view === "contact_submissions" && <div className="admin-inbox">{rows.length === 0 ? <div className="admin-empty">No enquiries have been received.</div> : rows.map((row) => <article className="admin-contact-item" key={String(row.id)}><div className="admin-contact-head"><span>{String(row.name)} <small>{String(row.email)}</small></span><time>{String(row.created_at ?? "")}</time></div><h2>{String(row.subject)}</h2><p>{String(row.message)}</p>{row.read_at ? <span className="read-status"><Check size={13} /> Read</span> : <button className="text-link" onClick={() => void markRead(row)}>Mark as read <Check size={13} /></button>}</article>)}</div>}

          <div className="admin-media"><div><CloudUpload size={16} /><strong>Site media library</strong><span>Upload a verified image to public site media storage.</span></div><label className="button button-outline">Upload image<input type="file" accept="image/*" disabled={busy} onChange={(event) => void uploadAsset(event.target.files?.[0])} /></label>{assetUrl && <div className="admin-asset-url"><input value={assetUrl} readOnly aria-label="Uploaded image public URL" /><button className="icon-button" onClick={() => void copyAssetUrl()}>Copy</button></div>}</div>
          <p className="admin-rules-note"><Shield size={14} /> Publishing evidence requires both <code>verified: true</code> and <code>published: true</code>. Supabase policies enforce administrator access independently of this screen.</p>
        </section>
      </div>
    </AdminFrame>
  );
}

function AdminFrame({ children }: { children: React.ReactNode }) {
  return <main id="main-content" className="admin-page">{children}</main>;
}
