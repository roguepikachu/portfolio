import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, Copy, Check, Linkedin, Download } from 'lucide-react';
import { toast } from 'sonner';
import { siteConfig } from '@/config';
import styles from './contact-modal.module.css';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  // const [phoneCopied, setPhoneCopied] = useState(false);

  const email = siteConfig.personal.email;
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
      <DialogContent className={styles.content}>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>Feel free to reach out via email.</DialogDescription>
        </DialogHeader>
        <div className={styles.contactsContainer}>
          <div className={styles.contactItem}>
            <div className={styles.iconContainer}>
              <Mail className={styles.icon} />
            </div>
            <div className={styles.contactInfo}>
              <p className={styles.label}>Email</p>
              <a href={`mailto:${email}`} className={styles.link}>
                {email}
              </a>
            </div>
            <Button variant="outline" size="sm" className={styles.copyButton} onClick={() => copyToClipboard(email, 'email')}>
              {emailCopied ? <Check className={styles.copyIcon} /> : <Copy className={styles.copyIcon} />}
              <span className={styles.srOnly}>Copy email</span>
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
        <DialogFooter className={styles.footer}>
          <div className={styles.actionButtons}>
            <Button 
              asChild 
              className={`${styles.fullWidthButton} bg-blue-600 hover:bg-blue-700 text-white`}
            >
              <a 
                href={siteConfig.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button 
              asChild 
              className={`${styles.fullWidthButton} bg-blue-500 hover:bg-blue-600 text-white`}
            >
              <a 
                href={siteConfig.external.resumePath} 
                target="_blank" 
                rel="noopener noreferrer"
                download
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
