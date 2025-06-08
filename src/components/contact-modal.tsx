import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  // const [phoneCopied, setPhoneCopied] = useState(false);

  // Replace with your actual contact info
  const email = 'kumar.ayush.cs@gmail.com';
  // const phone = "+1 (123) 456-7890";

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);

    if (type === 'email') {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
    // else {
    //   setPhoneCopied(true);
    //   setTimeout(() => setPhoneCopied(false), 2000);
    // }

    toast.success(`${type === 'email' ? 'Email' : 'Phone'} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>Feel free to reach out via email.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Email</p>
              <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:underline">
                {email}
              </a>
            </div>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => copyToClipboard(email, 'email')}>
              {emailCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy email</span>
            </Button>
          </div>

          {/* <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Phone</p>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:underline">
                {phone}
              </a>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => copyToClipboard(phone, 'phone')}
            >
              {phoneCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy phone</span>
            </Button>
          </div> */}
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
