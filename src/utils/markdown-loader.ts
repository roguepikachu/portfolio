
import { useEffect, useState } from 'react';

export const useMarkdownFile = (filePath: string) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load markdown file: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError(err instanceof Error ? err : new Error('Unknown error loading markdown'));
        setContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, [filePath]);

  return { content, isLoading, error };
};

export const getMarkdownFiles = async (directory: string): Promise<string[]> => {
  try {
    // In a real application, this would fetch the list of files from the server
    // For now, we'll simulate based on our known files
    switch (directory) {
      case 'projects':
        return [
          'personal-portfolio.md',
          'blog-platform.md',
          'ecommerce-dashboard.md',
          'weather-app.md',
          'task-manager.md',
          'recipe-finder.md'
        ];
      case 'publications':
        return [
          'machine-learning-trends.md',
          'web-accessibility.md'
        ];
      case 'blog':
        return [
          'getting-started-with-react.md',
          'typescript-best-practices.md'
        ];
      default:
        return [];
    }
  } catch (error) {
    console.error("Error getting markdown files:", error);
    return [];
  }
};
