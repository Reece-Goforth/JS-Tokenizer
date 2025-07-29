/**
 * Tokenizer Class
 * 
 * Lazily pulls a token from a stream
 */

class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    isEOF() {
        return this._cursor === this._string.length;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        // Numbers:
        if (!Number.isNaN(Number(string[0]))) {
            // Number token
            let number = '';

            while (!Number.isNaN(Number(string[this._cursor]))) {
                // Builds the number from the string while consuming each character (curser++)
                number += string[this._cursor++];
            }

            return {
                type: "NUMBER",
                value: number,
            };
        }

        // String:
        if (string[0] === '"') {
            // Collect all characters of the string
            let s = '';
            do {
                s += string[this._cursor++];
            } while (string[this._cursor] !== '"' && !this.isEOF());
            
            s += this._cursor++; // skip "
            
            return {
                type: "STRING",
                value: s,
            };
        }

        return null;
    }
}

module.exports = {
    Tokenizer,
}