import { igdbQuery } from './client'

export async function searchGames(searchTerm) {
  return igdbQuery('games', `
    search "${searchTerm}";
    fields id, name, slug, summary, cover.url,
           first_release_date, genres.name,
           involved_companies.company.name,
           rating, rating_count;
    where version_parent = null;
    limit 10;
  `)
}

export async function getGameById(igdbId) {
  return igdbQuery('games', `
    fields id, name, slug, summary, cover.url,
           screenshots.url, first_release_date,
           genres.name, platforms.name,
           involved_companies.company.name,
           rating, rating_count, storyline;
    where id = ${igdbId};
  `)
}

export async function getTopRatedGames(limit = 20) {
  return igdbQuery('games', `
    fields id, name, slug, summary, cover.url,
           first_release_date, genres.name, rating;
    where rating != null & version_parent = null & rating_count > 100;
    sort rating desc;
    limit ${limit};
  `)
}

export async function getCharactersByGameId(igdbId) {
  return igdbQuery('characters', `
    fields id, name, slug, description,
           gender, species, mug_shot.url,
           games.name;
    where games = (${igdbId});
  `)
}

export async function searchCharacters(searchTerm) {
  return igdbQuery('characters', `
    search "${searchTerm}";
    fields id, name, slug, description,
           mug_shot.url, games.name;
    limit 10;
  `)
}