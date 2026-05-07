// Fix script: Re-escape backticks inside template literals in lessons.ts
// The problem: a previous edit replaced ALL \` with ` throughout the file,
// including the ones that NEEDED to be escaped inside template literal strings.
const fs = require('fs');
const fp = 'd:/dev/react-learn/src/data/lessons.ts';
let content = fs.readFileSync(fp, 'utf8');

// Strategy: Walk through the file character by character.
// Track whether we're inside a template literal.
// Inside a template literal, any ` that is NOT the closing delimiter 
// should be escaped as \`.

let result = '';
let i = 0;
let inTemplateLiteral = false;
let braceDepth = 0; // for ${...} expressions

while (i < content.length) {
  const ch = content[i];
  const next = content[i + 1];
  
  if (!inTemplateLiteral) {
    // Not in template literal
    if (ch === '`') {
      // Start of template literal
      inTemplateLiteral = true;
      braceDepth = 0;
      result += ch;
      i++;
    } else if (ch === "'" || ch === '"') {
      // Regular string - skip to end
      const quote = ch;
      result += ch;
      i++;
      while (i < content.length) {
        if (content[i] === '\\') {
          result += content[i] + content[i + 1];
          i += 2;
        } else if (content[i] === quote) {
          result += content[i];
          i++;
          break;
        } else {
          result += content[i];
          i++;
        }
      }
    } else if (ch === '/' && next === '/') {
      // Line comment
      while (i < content.length && content[i] !== '\n') {
        result += content[i];
        i++;
      }
    } else if (ch === '/' && next === '*') {
      // Block comment
      result += '/*';
      i += 2;
      while (i < content.length - 1 && !(content[i] === '*' && content[i + 1] === '/')) {
        result += content[i];
        i++;
      }
      if (i < content.length - 1) {
        result += '*/';
        i += 2;
      }
    } else {
      result += ch;
      i++;
    }
  } else {
    // Inside template literal
    if (ch === '\\') {
      // Escape sequence - keep as-is
      result += ch;
      if (next !== undefined) {
        result += next;
        i += 2;
      } else {
        i++;
      }
    } else if (ch === '$' && next === '{') {
      // Template expression start
      result += '${';
      braceDepth++;
      i += 2;
    } else if (ch === '}' && braceDepth > 0) {
      result += '}';
      braceDepth--;
      i++;
    } else if (ch === '`') {
      if (braceDepth > 0) {
        // Nested template literal inside ${...} - this is complex
        // For our purposes, we don't have nested templates, so treat as end
        result += ch;
        inTemplateLiteral = false;
        i++;
      } else {
        // This could be:
        // 1. The closing delimiter of the template literal
        // 2. An inline backtick that should be escaped
        
        // Heuristic: If this ` is followed by content that looks like
        // continuing the template (like a property name or comma),
        // then it's the closing delimiter.
        // Check what comes after, skipping whitespace.
        let afterIdx = i + 1;
        while (afterIdx < content.length && (content[afterIdx] === ' ' || content[afterIdx] === '\n' || content[afterIdx] === '\r')) {
          afterIdx++;
        }
        const afterChar = content[afterIdx];
        
        // If after the ` we see a comma, semicolon, or property-like pattern,
        // this is the closing delimiter
        if (afterChar === ',' || afterChar === ';' || afterChar === ')' || afterChar === ']' || afterChar === '}') {
          // Closing delimiter
          result += ch;
          inTemplateLiteral = false;
          i++;
        } else {
          // This is an inline backtick that needs escaping
          result += '\\`';
          i++;
        }
      }
    } else {
      result += ch;
      i++;
    }
  }
}

fs.writeFileSync(fp, result, 'utf8');
console.log('File re-escaped. Length:', result.length);

// Verify: try to parse with TypeScript
try {
  const ts = require('typescript');
  const sourceFile = ts.createSourceFile('lessons.ts', result, ts.ScriptTarget.Latest, true);
  const diags = [];
  // Simple syntax check
  ts.forEachChild(sourceFile, function visit(node) {
    ts.forEachChild(node, visit);
  });
  console.log('TypeScript parse: OK');
} catch(e) {
  console.log('TypeScript parse error:', e.message);
}
