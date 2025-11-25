/**
 * Social media sharing utilities
 */

export interface ShareData {
  title: string;
  description: string;
  url: string;
  image?: string;
}

/**
 * Share to Facebook
 */
export function shareToFacebook(data: ShareData): void {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share to Twitter/X
 */
export function shareToTwitter(data: ShareData): void {
  const text = `${data.title} - ${data.description}`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share to LinkedIn
 */
export function shareToLinkedIn(data: ShareData): void {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Share to WhatsApp
 */
export function shareToWhatsApp(data: ShareData): void {
  const text = `${data.title}%0A%0A${data.description}%0A%0A${data.url}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(shareUrl, '_blank');
}

/**
 * Share via Email
 */
export function shareViaEmail(data: ShareData): void {
  const subject = encodeURIComponent(data.title);
  const body = encodeURIComponent(`${data.description}\n\n${data.url}`);
  const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}

/**
 * Share to Pinterest
 */
export function shareToPinterest(data: ShareData): void {
  const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(data.url)}&description=${encodeURIComponent(data.description)}${data.image ? `&media=${encodeURIComponent(data.image)}` : ''}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

/**
 * Copy link to clipboard
 */
export async function copyToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Get the current page URL
 */
export function getCurrentUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.href;
  }
  return '';
}

/**
 * Get absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  if (typeof window !== 'undefined') {
    return new URL(path, window.location.origin).href;
  }
  return path;
}

