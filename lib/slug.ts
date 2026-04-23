const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

export const generateCardSlug = (firstName: string, lastName: string): string => {
  const base = slugify(`${firstName}-${lastName}`) || 'carte';
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
};
