class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word
  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  // Search exact word
  search(word: string): boolean {
    const node = this.traverse(word);
    return !!node && node.isEndOfWord;
  }

  // Check if prefix exists
  startsWith(prefix: string): boolean {
    return !!this.traverse(prefix);
  }

  // Delete a word
  delete(word: string): boolean {
    return this.deleteHelper(this.root, word, 0);
  }

  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;

      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const child = node.children.get(char);
    if (!child) return false;

    const shouldDeleteChild = this.deleteHelper(child, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }

  // Autocomplete helper
  getWordsWithPrefix(prefix: string): string[] {
    const result: string[] = [];
    const node = this.traverse(prefix);

    if (!node) return result;

    this.collectWords(node, prefix, result);
    return result;
  }

  private collectWords(node: TrieNode, prefix: string, result: string[]) {
    if (node.isEndOfWord) {
      result.push(prefix);
    }

    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, result);
    }
  }

  private traverse(str: string): TrieNode | null {
    let current = this.root;

    for (const char of str) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }
}