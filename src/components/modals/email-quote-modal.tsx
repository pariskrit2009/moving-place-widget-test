interface EmailQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EmailQuoteModal({ open, onOpenChange }: EmailQuoteModalProps) {
  return (
    <div role="dialog" aria-modal="true">
      {/* Email quote modal content - TODO: implement */}
    </div>
  );
}
