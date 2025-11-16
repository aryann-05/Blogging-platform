// Format date helper
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Truncate text helper
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Share URL helper
export const shareUrl = (platform, url, title) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
  
  return urls[platform];
};

// Validate email helper
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Generate avatar placeholder
export const getAvatarPlaceholder = (name) => {
  return name.charAt(0).toUpperCase();
};