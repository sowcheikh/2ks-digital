'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Upload,
  Trash2,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Tag,
} from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase-client';
import type { Contact } from '@/lib/types';

export default function AdminContactsPage() {
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Add form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTags, setNewTags] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setContacts(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    setAdding(true);

    const { error } = await supabase.from('contacts').insert({
      name: newName.trim(),
      phone: newPhone.trim(),
      tags: newTags ? newTags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      opt_in: true,
    });

    if (error) {
      showToast('error', error.message);
    } else {
      showToast('success', 'Contact ajouté.');
      setNewName('');
      setNewPhone('');
      setNewTags('');
      setShowAddModal(false);
      fetchContacts();
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce contact ?')) return;
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) {
      showToast('error', error.message);
    } else {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showToast('success', 'Contact supprimé.');
    }
  };

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);

    const text = await file.text();
    const lines = text.split('\n').filter((l) => l.trim());
    if (lines.length < 2) {
      showToast('error', 'Fichier CSV vide ou invalide.');
      setImporting(false);
      return;
    }

    const header = lines[0].toLowerCase();
    const nameIdx = header.split(',').findIndex((h) => h.trim().includes('nom') || h.trim().includes('name'));
    const phoneIdx = header.split(',').findIndex((h) => h.trim().includes('phone') || h.trim().includes('tel'));
    const tagsIdx = header.split(',').findIndex((h) => h.trim().includes('tag'));

    if (nameIdx === -1 || phoneIdx === -1) {
      showToast('error', 'CSV doit contenir les colonnes "nom" et "phone/tel".');
      setImporting(false);
      return;
    }

    const rows = lines.slice(1).map((line) => {
      const cols = line.split(',');
      return {
        name: cols[nameIdx]?.trim() ?? '',
        phone: cols[phoneIdx]?.trim() ?? '',
        tags: tagsIdx !== -1 && cols[tagsIdx]
          ? cols[tagsIdx].split(';').map((t) => t.trim()).filter(Boolean)
          : [],
        opt_in: true,
      };
    }).filter((r) => r.name && r.phone);

    if (rows.length === 0) {
      showToast('error', 'Aucun contact valide trouvé.');
      setImporting(false);
      return;
    }

    const { error } = await supabase.from('contacts').insert(rows);
    if (error) {
      showToast('error', error.message);
    } else {
      showToast('success', `${rows.length} contact(s) importé(s).`);
      fetchContacts();
    }
    setImporting(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent transition-all duration-200';

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl
                text-sm font-medium shadow-xl ${
                  toast.type === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
            >
              {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Contacts</h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              {contacts.length} contact{contacts.length !== 1 ? 's' : ''} au total
            </p>
          </div>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
              bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
              text-[var(--fg)] hover:bg-gray-50 dark:hover:bg-[#0c1d3a]
              transition-colors cursor-pointer">
              {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              Import CSV
              <input
                ref={fileRef}
                type="file"
                accept=".csv"
                onChange={handleCSVImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
            >
              <Plus size={16} />
              Ajouter
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou téléphone…"
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm
              bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
              text-[var(--fg)] placeholder-[var(--fg-muted)]
              focus:outline-none focus:ring-2 focus:ring-[#002B5C]"
          />
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-sm text-[var(--fg-muted)]">Chargement…</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center">
              <Users size={32} className="mx-auto text-[var(--fg-muted)] mb-3" />
              <p className="text-sm text-[var(--fg-muted)]">
                {search ? 'Aucun résultat.' : 'Aucun contact. Ajoutez-en ou importez un CSV.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#1e3a5f]">
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] hidden sm:table-cell">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] hidden md:table-cell">
                      Opt-in
                    </th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#1e3a5f]">
                  {filtered.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#0c1d3a] transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#002B5C] flex items-center justify-center
                            text-white text-xs font-bold flex-shrink-0">
                            {contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm font-semibold text-[var(--fg)]">{contact.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[var(--fg-muted)]">{contact.phone}</td>
                      <td className="px-6 py-3.5 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(contact.tags ?? []).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
                                font-semibold bg-[#002B5C]/10 text-[#002B5C] dark:bg-[#002B5C]/30 dark:text-blue-300"
                            >
                              <Tag size={9} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 hidden md:table-cell">
                        {contact.opted_out_at ? (
                          <span className="text-xs text-red-500 font-semibold">STOP</span>
                        ) : contact.opt_in ? (
                          <span className="text-xs text-green-600 font-semibold">Oui</span>
                        ) : (
                          <span className="text-xs text-gray-400 font-semibold">Non</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500
                            hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="fixed inset-0 bg-black z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
                  rounded-2xl p-6 w-full max-w-md shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-[var(--fg)]">Ajouter un contact</h2>
                    <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0c1d3a]">
                      <X size={18} className="text-[var(--fg-muted)]" />
                    </button>
                  </div>

                  <form onSubmit={handleAdd} className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">Nom *</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Awa Diallo"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">Téléphone (E.164) *</label>
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+221771234567"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">Tags (séparés par virgule)</label>
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="pme, restaurant, dakar"
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={adding}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                        font-semibold text-white bg-[#002B5C] hover:bg-[#003d80]
                        disabled:opacity-60 transition-colors"
                    >
                      {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                      Ajouter le contact
                    </button>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminShell>
  );
}
