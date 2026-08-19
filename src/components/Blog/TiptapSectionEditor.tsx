"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { JSONContent } from "@/types/blog";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  CodeSquare,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Undo,
  Redo,
  Type,
  Loader2,
} from "lucide-react";

interface TiptapSectionEditorProps {
  initialContent?: JSONContent | string;
  onChange: (json: JSONContent) => void;
  placeholder?: string;
}

export default function TiptapSectionEditor({
  initialContent,
  onChange,
  placeholder = "Write section content here...",
}: TiptapSectionEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Normalize initial content
  const contentToLoad = typeof initialContent === "string"
    ? { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: initialContent }] }] }
    : (initialContent || { type: "doc", content: [{ type: "paragraph", content: [] }] });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#2563eb] underline font-medium",
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "rounded-2xl my-4 max-h-[420px] w-full object-cover border border-[#d6e5fb]",
        },
      }),
    ],
    content: contentToLoad,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[180px] p-4 text-[15px] leading-relaxed text-[#1e293b]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialContent) {
      const currentJson = JSON.stringify(editor.getJSON());
      const newJson = JSON.stringify(contentToLoad);
      if (currentJson !== newJson) {
        editor.commands.setContent(contentToLoad);
      }
    }
  }, [initialContent]);

  if (!editor) {
    return (
      <div className="h-[200px] animate-pulse rounded-xl border border-[#d3e2f5] bg-[#f8fbff]" />
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL:", previousUrl || "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };



  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      setIsUploading(true);
      try {
        const token = sessionStorage.getItem("flutterflirt_admin_token");
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/admin/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to upload image");

        editor.chain().focus().setImage({ src: data.imageUrl }).run();
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  const getCurrentTextSize = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "p";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#cbdff8] bg-white shadow-sm transition focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20">
      {/* ── Rich Formatting Toolbar ── */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#e2edf9] bg-[#f6faff] p-2 text-xs">

        {/* Font Size / Style Selector */}
        <div className="flex items-center gap-1 border-r border-[#d4e4f8] pr-2">
          <select
            value={getCurrentTextSize()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "p") editor.chain().focus().setParagraph().run();
              else if (val === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
              else if (val === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
              else if (val === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className="rounded-lg border border-[#cbdff8] bg-white px-2 py-1 text-xs font-semibold text-[#1e3a60] focus:border-[#2563eb] focus:outline-none"
          >
            <option value="p">Normal Text (16px)</option>
            <option value="h3">Medium Heading (20px)</option>
            <option value="h2">Large Heading (26px)</option>
            <option value="h1">Extra Large Title (32px)</option>
          </select>
        </div>

        {/* Inline Formatting */}
        <div className="flex items-center gap-1 border-r border-[#d4e4f8] pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>

        {/* Structure / Block Types */}
        <div className="flex items-center gap-1 border-r border-[#d4e4f8] pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote Block"
          >
            <Quote className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <CodeSquare className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            active={false}
            title="Horizontal Divider"
          >
            <Minus className="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>

        {/* Media & Links */}
        <div className="flex items-center gap-1 border-r border-[#d4e4f8] pr-2">
          <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Add Link">
            <LinkIcon className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton onClick={addImage} active={false} title={isUploading ? "Uploading image..." : "Upload & Embed Image"}>
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImageIcon className="h-3.5 w-3.5" />
            )}
          </ToolbarButton>
        </div>

        {/* History */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            active={false}
            title="Undo"
          >
            <Undo className="h-3.5 w-3.5" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            active={false}
            title="Redo"
          >
            <Redo className="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>
      </div>

      {/* ── Editor Canvas ── */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${active
          ? "bg-[#2563eb] text-white shadow-xs"
          : "text-[#47607e] hover:bg-[#e4effd] hover:text-[#163860]"
        }`}
    >
      {children}
    </button>
  );
}
