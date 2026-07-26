import { Product } from '../types';

/**
 * Utility to share a specific product with its exact image and metadata.
 * Supports native file share (Story/Feed/Mobile), WhatsApp share with direct image preview, and link copy.
 */
export async function shareProduct(
  product: Product,
  mode: 'native' | 'whatsapp' | 'copy'
): Promise<{ success: boolean; copied?: boolean }> {
  const baseUrl = 'https://stern-cosm.vercel.app';
  const fullImageUrl = product.image.startsWith('http')
    ? product.image
    : `${baseUrl}${product.image}`;
  const productUrl = `${baseUrl}/?product=${product.id}`;

  const formattedPrice = `${product.price.toLocaleString('fr-FR')} FCFA`;
  const shareTitle = `${product.name} (${formattedPrice}) — Stern Cosmétique`;

  const shareText = `Découvre *${product.name}* (${formattedPrice}) chez Stern Cosmétique 🌿✨\n\n🖼️ Visuel du produit : ${fullImageUrl}\n🛒 Fiche produit : ${productUrl}`;

  if (mode === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
    return { success: true };
  }

  if (mode === 'copy') {
    try {
      await navigator.clipboard.writeText(productUrl);
      return { success: true, copied: true };
    } catch {
      return { success: false };
    }
  }

  // Native sharing with image file attachment (for Instagram Story, Facebook Feed, Native Sheet)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      const response = await fetch(fullImageUrl);
      const blob = await response.blob();
      const fileName = `${product.id}.jpg`;
      const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: shareTitle,
          text: `Découvre ${product.name} chez Stern Cosmétique (${formattedPrice}) 🌿✨`,
          url: productUrl,
          files: [file],
        });
        return { success: true };
      }
    } catch (err) {
      console.warn('Native file share fallback:', err);
    }

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: productUrl,
      });
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  // Fallback to WhatsApp
  window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  return { success: true };
}
