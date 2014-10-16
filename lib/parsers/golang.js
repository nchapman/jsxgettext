var unescapedDoubleQuote = /([^\\])"|^"/g;
function escapeQuotes(str) {
  return str.replace(unescapedDoubleQuote, function (match, group) {
    var prefix = group || '';
    return prefix + '\\"';
  });
}

function parseGolang(str, filename, options) {
  var buf = [];
  var pattern = /{{\s*?(["'])(.*?)\1\s*?\|\s*?l\s*?}}/i;

  str.split(/\n/).forEach(function (line) {
    var match = line.match(pattern);
    if (match) {
      buf.push('gettext("' + escapeQuotes(match[2]) + '");');
    } else {
      buf.push('');
    }
  });

  return buf.join('\n');
}

exports.golang = function golang(golangSources, options) {
  Object.keys(golangSources).forEach(function (filename) {
    golangSources[filename] = parseGolang(golangSources[filename], filename, options);
  });

  return [golangSources, options];
};
