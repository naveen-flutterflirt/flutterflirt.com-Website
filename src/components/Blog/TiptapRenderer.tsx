"use client";

import React, { useState } from "react";
import { JSONContent } from "@/types/blog";
import { Check, Copy } from "lucide-react";

const formatS3Url = (url: string | null | undefined): string => {
  if (!url) return "";
  const regex = /^https:\/\/([a-zA-Z0-9.\-_]+)\.s3\.([a-z0-9\-]+)\.amazonaws\.com\/(.+)$/;
  const match = url.match(regex);
  if (match) {
    const bucket = match[1];
    const region = match[2];
    const path = match[3];
    return `https://s3.${region}.amazonaws.com/${bucket}/${path}`;
  }
  return url;
};

interface TiptapRendererProps {
  content: JSONContent | string | null | undefined;
  className?: string;
}

export default function TiptapRenderer({ content, className = "" }: TiptapRendererProps) {
  if (!content) {
    return null;
  }

  // Handle plain string content (legacy fallback)
  if (typeof content === "string") {
    return (
      <div className={`space-y-4 text-[17px] leading-[1.8] text-[#3e5473] ${className}`}>
        {content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  if (content.type !== "doc" || !Array.isArray(content.content)) {
    return null;
  }

  return (
    <div className={`tiptap-rendered-content space-y-6 text-[17px] leading-[1.8] text-[#3e5473] ${className}`}>
      {content.content.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  );
}

function RenderNode({ node }: { node: JSONContent }) {
  if (!node) return null;

  switch (node.type) {
    case "paragraph":
      return (
        <p className="text-[17px] leading-[1.8] text-[#425773]">
          {node.content ? node.content.map((child, i) => <RenderInline key={i} node={child} />) : <br />}
        </p>
      );

    case "heading": {
      const level = node.attrs?.level || 2;
      const textChildren = node.content?.map((child, i) => <RenderInline key={i} node={child} />);

      if (level === 1 || level === 2) {
        return (
          <h3 className="mt-8 mb-3 font-serif text-[26px] font-bold text-[#14233c] md:text-[30px] tracking-tight">
            {textChildren}
          </h3>
        );
      }
      if (level === 3) {
        return (
          <h4 className="mt-6 mb-2 text-[20px] font-bold text-[#14233c]">
            {textChildren}
          </h4>
        );
      }
      return (
        <h5 className="mt-4 mb-2 text-[18px] font-semibold text-[#14233c]">
          {textChildren}
        </h5>
      );
    }

    case "bulletList":
      return (
        <ul className="my-4 ml-6 list-disc space-y-2 text-[#425773]">
          {node.content?.map((item, i) => (
            <li key={i} className="pl-1">
              {item.content?.map((child, j) => (
                <RenderNode key={j} node={child} />
              ))}
            </li>
          ))}
        </ul>
      );

    case "orderedList":
      return (
        <ol className="my-4 ml-6 list-decimal space-y-2 text-[#425773]">
          {node.content?.map((item, i) => (
            <li key={i} className="pl-1">
              {item.content?.map((child, j) => (
                <RenderNode key={j} node={child} />
              ))}
            </li>
          ))}
        </ol>
      );

    case "blockquote":
      return (
        <blockquote className="my-6 rounded-r-2xl border-l-4 border-[#2563eb] bg-[#f0f6ff] px-6 py-4 italic text-[#1d3252] shadow-sm">
          {node.content?.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </blockquote>
      );

    case "codeBlock": {
      const codeText = node.content?.map((c) => c.text || "").join("") || "";
      const language = node.attrs?.language || "bash";
      return <CodeBlockWrapper code={codeText} language={language} />;
    }

    case "image":
      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-[#d6e5fb] bg-white p-2 shadow-sm">
          <img
            src={formatS3Url(node.attrs?.src)}
            alt={node.attrs?.alt || "Blog visual"}
            className="h-auto w-full rounded-xl object-cover"
          />
          {node.attrs?.title && (
            <figcaption className="mt-2 text-center text-xs text-[#7188a8]">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      );

    case "horizontalRule":
      return <hr className="my-8 border-t border-[#d6e5fb]" />;

    default:
      return null;
  }
}

function RenderInline({ node }: { node: JSONContent }) {
  if (!node) return null;

  if (node.type === "hardBreak") {
    return <br />;
  }

  let element: React.ReactNode = node.text || "";

  if (node.marks && Array.isArray(node.marks)) {
    for (const mark of node.marks) {
      switch (mark.type) {
        case "bold":
          element = <strong className="font-bold text-[#14233c]">{element}</strong>;
          break;
        case "italic":
          element = <em className="italic">{element}</em>;
          break;
        case "underline":
          element = <u className="underline underline-offset-4">{element}</u>;
          break;
        case "strike":
          element = <s className="line-through">{element}</s>;
          break;
        case "code":
          element = (
            <code className="rounded bg-[#e8f1fd] px-1.5 py-0.5 font-mono text-[14px] font-semibold text-[#1e40af]">
              {element}
            </code>
          );
          break;
        case "link":
          element = (
            <a
              href={mark.attrs?.href}
              target={mark.attrs?.target || "_blank"}
              rel="noopener noreferrer"
              className="font-medium text-[#2563eb] underline underline-offset-4 transition hover:text-[#1d4ed8]"
            >
              {element}
            </a>
          );
          break;
      }
    }
  }

  return <>{element}</>;
}

function CodeBlockWrapper({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0f172a] text-slate-100 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#334155] px-4 py-2 text-xs text-slate-400 font-mono">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 rounded bg-[#1e293b] px-2.5 py-1 text-slate-300 transition hover:bg-[#334155] hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[14px] leading-relaxed text-emerald-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
