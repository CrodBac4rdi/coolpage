import { useEffect, useState } from 'react';

export interface StoryData {
  title: string;
  content: string;
}

export async function loadStory(storyId: string, chapterId?: string): Promise<StoryData | null> {
  try {
    // Wenn ein Kapitel angegeben ist, versuche dieses zu laden
    if (chapterId) {
      const response = await fetch(`/stories/${storyId}/${chapterId}.md`);
      
      if (!response.ok) {
        console.error(`Fehler beim Laden von ${storyId}/${chapterId}:`, response.status);
        return null;
      }
      
      const content = await response.text();
      return {
        title: `${storyId} - ${chapterId}`,
        content
      };
    } 
    // Ansonsten versuche das erste Kapitel zu laden
    else {
      const response = await fetch(`/stories/${storyId}/chapter-01.md`);
      
      if (!response.ok) {
        console.error(`Fehler beim Laden von ${storyId}/chapter-01:`, response.status);
        return null;
      }
      
      const content = await response.text();
      return {
        title: storyId,
        content
      };
    }
  } catch (error) {
    console.error("Fehler beim Laden der Geschichte:", error);
    return null;
  }
}