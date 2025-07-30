/**
 * Tokenizer spec
 */
const Spec = [
    // WHITESPACE
    [/^\s+/, null],

    // COMMENTS
    [/^\/\/.*/, null],
    [/^\/\*[\s\S]*?\*\//], // Multi-line /* */

    // SYMBOLS, DELIMETERS
    [/^;/, ';'],

    // NUMBERS
    [/^\d+/, 'NUMBER'],

    // STRINGS
    [/"[^"]*"/, 'STRING'],
    [/'[^']*'/, 'STRING'],
];

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

        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);

            if (tokenValue == null) {
                continue;
            }

            if (tokenType == null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
            };
        }
        throw new SyntaxError(`Unexpected token: "${string[0]}"`);
    }

    /**
     * Matches a token for a regular expression
     */
    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }
        this._cursor += matched[0].length;
        return matched[0];
    }
}

module.exports = {
    Tokenizer,
}