export interface Self {
	href: string;
}

export interface _link {
	self: Self;
}

export interface Faction {
	type: string;
	name: string;
}

export interface Key {
	href: string;
}

export interface Realm {
	key: Key;
	name: string;
	id: number;
	slug: string;
}

export interface Key {
	href: string;
}

export interface Media {
	key: Key;
	id: number;
}

export interface Rgba {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface Color {
	id: number;
	rgba: Rgba;
}

export interface Emblem {
	id: number;
	media: Media;
	color: Color;
}

export interface Key {
	href: string;
}

export interface Media {
	key: Key;
	id: number;
}

export interface Rgba {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface Color {
	id: number;
	rgba: Rgba;
}

export interface Border {
	id: number;
	media: Media;
	color: Color;
}

export interface Rgba {
	r: number;
	g: number;
	b: number;
	a: number;
}

export interface Color {
	id: number;
	rgba: Rgba;
}

export interface Background {
	color: Color;
}

export interface Crest {
	emblem: Emblem;
	border: Border;
	background: Background;
}

export interface Roster {
	href: string;
}

export interface Achievement {
	href: string;
}

export interface Activity {
	href: string;
}

export interface Guild {
	_links: _link;
	id: number;
	name: string;
	faction: Faction;
	achievement_points: number;
	member_count: number;
	realm: Realm;
	crest: Crest;
	roster: Roster;
	achievements: Achievement;
	created_timestamp: number;
	activity: Activity;
}