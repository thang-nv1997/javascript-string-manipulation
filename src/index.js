// Create a tagged template lf`...` that formats text using LF line endings.
var lf = (literals, ...substitutions) => {
  let result = "";

  for (let i = 0; i < substitutions.length; i++) {
    result += transformLineEnding(literals[i], LineEndings.LF);

    let substitutionsValue = (substitutions[i] != null? substitutions[i] : "");
    if (!Object.getOwnPropertySymbols(substitutionsValue).includes(disableConverter)){
      substitutionsValue = transformLineEnding(substitutionsValue, LineEndings.LF);
    }
    result += substitutionsValue;
  }

  result += transformLineEnding(literals[literals.length - 1], LineEndings.LF);

  return result
};

// Create a tagged template cr`...` that formats text using CR line endings.
// var cr = () => {};
var cr = (literals, ...substitutions) => {
  let result = "";

  for (let i = 0; i < substitutions.length; i++) {
    result += transformLineEnding(literals[i], LineEndings.CR);

    let substitutionsValue = (substitutions[i] != null? substitutions[i] : "");
    if (!Object.getOwnPropertySymbols(substitutionsValue).includes(disableConverter)){
      substitutionsValue = transformLineEnding(substitutionsValue, LineEndings.CR);
    }
    result += substitutionsValue;
  }

  result += transformLineEnding(literals[literals.length - 1], LineEndings.CR);

  return result
};

// Create a tagged template crlf`...` that formats text using CRLF line endings.
// var crlf = () => {};
var crlf = (literals, ...substitutions) => {
  let result = "";

  for (let i = 0; i < substitutions.length; i++) {
    result += transformLineEnding(literals[i], LineEndings.CRLF);

    let substitutionsValue = (substitutions[i] != null? substitutions[i] : "");
    if (!Object.getOwnPropertySymbols(substitutionsValue).includes(disableConverter)){
      substitutionsValue = transformLineEnding(substitutionsValue, LineEndings.CRLF);
    }
    result += substitutionsValue;
  }

  result += transformLineEnding(literals[literals.length - 1], LineEndings.CRLF);

  return result
};

const transformLineEnding = (string, lineEnding) => {
  string = (string != null ? string.toString() : "");
  const { replaceCR, replaceCRLF, replaceLF } = LineEndingReplacements;
  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r");
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n");
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n");
    string = replaceLF(string, "\r\n");
  }
  return string;
};
const disableConverter = Symbol.for("crlf-converter-disable");
const LineEndings = {
  CR : Symbol("CR"),
  LF: Symbol("LF"),
  CRLF: Symbol("CRLF")
};

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  transformLineEnding,
  disableConverter
};
