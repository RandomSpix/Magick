export type SpiritualPath = 
  | 'Reiki Master'
  | 'Astrology Guide'
  | 'Witch/Warlock'
  | 'Meditation Teacher'
  | 'Energy Healer'
  | 'Shamanic Practitioner'
  | 'Tarot Reader'
  | 'Crystal Worker'
  | 'Spiritual Coach'
  | 'Light Worker';

export type SpiritualRealm =
  | 'Astral Plane'
  | 'Crystal Kingdom'
  | 'Sacred Grove'
  | 'Healing Waters'
  | 'Ethereal Temple'
  | 'Ancient Wisdom'
  | 'Divine Light';

export type Interest = 
  | 'Chakras'
  | 'Numerology'
  | 'Sacred Herbs'
  | 'Sacred Geometry'
  | 'Astrology'
  | 'Meditation'
  | 'Crystal Healing'
  | 'Energy Work'
  | 'Tarot'
  | 'Runes'
  | 'Shamanism'
  | 'Divination';

export interface Profile {
  id: string;
  name?: string;
  spiritualPath: SpiritualPath;
  interests: Interest[];
  mantra: string;
  avatarUrl: string;
  resonanceCount: number;
  bio?: string;
  favoriteRealm?: SpiritualRealm;
  sacredCircles?: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  tags: string[];
  resonanceCount: number;
  realm?: SpiritualRealm;
  createdAt: Date;
}

export interface SacredCircle {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  memberCount: number;
  realm: SpiritualRealm;
  isPrivate: boolean;
  avatarUrl?: string;
}