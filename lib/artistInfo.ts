export const genres = ["Alternative Rock", "Emo", "Indie", "Post-Grunge"];

export const genreListNatural = `${genres.slice(0, -1).join(", ")}, and ${genres[genres.length - 1]}`;

export const soundDescription = `${genres.join(", ")}.`;
