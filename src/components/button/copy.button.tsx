'use client';

import { useState } from 'react';
import type { CopyLinkButtonProps } from '@/types';
import { toast } from 'sonner';
import { ClipboardCopy, Check } from 'lucide-react';

export const CopyLinkButton = ({ url }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Cannot copy link!');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition 
        ${copied ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-lime-400'}`}
    >
      {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
      {copied ? 'Copied' : 'Copy Link'}
    </button>
  );
};
