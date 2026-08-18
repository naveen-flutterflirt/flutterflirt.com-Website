"use client";

import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Loader2, MessageSquare, CheckCircle2, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  message: string;
  status: string;
}

export default function QueriesPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Detail / Reply modal state
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("flutterflirt_admin_token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      router.push("/flutterflirt-admin-login");
    }
    setIsInitializing(false);
  }, [router]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadQueries = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/admin/contact-queries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        localStorage.removeItem("flutterflirt_admin_token");
        router.push("/flutterflirt-admin-login");
        return;
      }
      const data = await res.json();
      setQueries(data.contactQueries || data || []);
    } catch (err) {
      console.error("Failed to load queries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadQueries();
    }
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/contact-queries/${id}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Query marked as ${status}`);
        loadQueries();
        if (selectedQuery && selectedQuery.id === id) {
          setSelectedQuery(prev => prev ? { ...prev, status } : null);
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery || !replyText.trim() || isSending) return;

    try {
      setIsSending(true);
      const res = await fetch(`${API_URL}/api/admin/contact-queries/${selectedQuery.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ replyMessage: replyText })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Reply sent successfully!");
        setReplyText("");
        setSelectedQuery(null);
        loadQueries();
      } else {
        alert(data.message || "Failed to send reply");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending reply email");
    } finally {
      setIsSending(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#edf5ff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  if (!token) return null; // Handled by useEffect redirect

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen bg-[#edf5ff] pb-20 pt-20 md:pt-15 w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 w-full">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#c9dff7] pb-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#dbe8fc] px-3 py-1 text-xs font-bold text-[#1e40af]">
                <MessageSquare className="h-3 w-3" />
                <span>Inbox</span>
              </div>
              <h1 className="mt-3 font-serif text-[32px] font-bold text-[#10223d] md:text-[42px]">
                Query Management
              </h1>
              <p className="text-sm text-[#617b9d]">
                Manage contact requests from your potential clients.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <div className="overflow-hidden rounded-[24px] border border-[#cbe0fb] bg-white shadow-[0_12px_40px_rgba(20,50,90,0.05)] w-full">
              <div className="border-b border-[#e5effb] bg-[#f8fbff] px-6 py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3b60]">
                  All Queries ({queries.length})
                </h2>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center p-16">
                  <Loader2 className="h-10 w-10 animate-spin text-[#9bb5d6]" />
                  <p className="mt-4 text-sm font-semibold text-[#738ea8]">Loading queries...</p>
                </div>
              ) : queries.length === 0 ? (
                <div className="p-16 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-[#9bb5d6]" />
                  <p className="mt-4 font-serif text-xl font-bold text-[#1a2f4c]">No queries found</p>
                </div>
              ) : (
                <div className="overflow-x-auto p-0">
                  <table className="w-full text-left text-sm text-[#3b577a]">
                    <thead className="bg-[#f0f5fc] text-xs uppercase text-[#1e3b60]">
                      <tr>
                        <th className="px-6 py-4 font-bold">Name</th>
                        <th className="px-6 py-4 font-bold">Email</th>
                        <th className="px-6 py-4 font-bold">Company</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5effb]">
                      {queries.map((q) => (
                        <tr key={q.id} className="transition hover:bg-[#f8fbff]">
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-[#112239]">{q.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{q.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">{q.companyName || '-'}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                              q.status === 'pending' ? 'bg-[#fef3c7] text-[#b45309]' :
                              q.status === 'replied' ? 'bg-[#dbeafe] text-[#1e40af]' :
                              'bg-[#dcfce7] text-[#15803d]'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setSelectedQuery(q);
                                  setReplyText("");
                                }} 
                                className="rounded-md bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                              >
                                View / Reply
                              </button>
                              <button 
                                onClick={() => updateStatus(q.id, 'closed')} 
                                className="rounded-md bg-[#475569] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#334155]"
                              >
                                Close
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View / Reply Modal */}
        {selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#cbe0fb] bg-white shadow-2xl animate-in zoom-in-95">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#e5effb] bg-[#f8fbff] px-6 py-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#142845]">Query Details</h3>
                  <p className="text-xs text-[#6984a6]">From {selectedQuery.name}</p>
                </div>
                <button 
                  onClick={() => setSelectedQuery(null)} 
                  className="rounded-lg p-1.5 text-[#8babc6] hover:bg-[#eff4fb] hover:text-[#1e3a60]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 text-sm bg-[#f0f5fc] p-4 rounded-2xl">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Email</span>
                    <span className="font-semibold text-[#1e3a60]">{selectedQuery.email}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Company</span>
                    <span className="font-semibold text-[#1e3a60]">{selectedQuery.companyName || "-"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6]">Status</span>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 mt-1 text-[10px] font-bold uppercase tracking-wide ${
                      selectedQuery.status === 'pending' ? 'bg-[#fef3c7] text-[#b45309]' :
                      selectedQuery.status === 'replied' ? 'bg-[#dbeafe] text-[#1e40af]' :
                      'bg-[#dcfce7] text-[#15803d]'
                    }`}>
                      {selectedQuery.status}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#6984a6] mb-1.5">User Message</span>
                  <div className="rounded-2xl border border-[#cbdff8] bg-white p-4 text-[#112239] text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedQuery.message}
                  </div>
                </div>

                {/* Email Reply Form */}
                <form onSubmit={handleSendReply} className="border-t border-[#e5effb] pt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#355375] mb-2">
                      Your Email Reply (will be sent directly to user)
                    </label>
                    <textarea
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                      placeholder="Type your response here..."
                      className="w-full rounded-xl border border-[#cbdff8] p-4 text-sm text-[#112239] transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedQuery(null)}
                      className="rounded-xl border border-[#c2daf7] px-4 py-2 text-xs font-bold text-[#23456c] transition hover:bg-[#e4efff]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending || !replyText.trim()}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1d4ed8] disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Send Reply Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
