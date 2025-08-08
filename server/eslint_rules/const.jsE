// custom rule to enforce ALL_CAPS for const variables
const constNamingRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce ALL_CAPS naming for const variables',
    },
    schema: [], // no options
  },
  create(context) {
    function isLiteral(node) {
      const { type, operator, argument } = node;
      return (
        type === 'Literal' ||
        type === 'TemplateLiteral' ||
        (type === 'UnaryExpression' && operator === '-' && argument.type === 'Literal')
      );
    }

    function isRequireCall(node) {
      return (
        node &&
        node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'require'
      );
    }

    function isImportExpression(node) {
      return node && node.type === 'ImportExpression';
    }

    return {
      VariableDeclaration(node) {
        //console.log(node.declarations);
        if (node.kind !== 'const') return;

        for (const declarator of node.declarations) {
          const varName = declarator.id.name;
          if (!varName) continue;

          const init = declarator.init;

          if (!init) continue; // no initializer, skip

          if (isLiteral(init)) {
            // For literals, enforce ALL_CAPS_WITH_UNDERSCORES
            if (!/^[A-Z0-9_]+$/.test(varName)) {
              context.report({
                node: declarator.id,
                message: 'Const literal \'{{name}}\' is not in screaming snake case',
                data: { name: varName },
              });
            }
          } else if (isRequireCall(init) || isImportExpression(init)) {
            // For imports, enforce camelCase or PascalCase (start lowercase or uppercase letter)
            if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(varName)) {
              context.report({
                node: declarator.id,
                message: 'Const import \'{{name}}\' should be camelCase or PascalCase',
                data: { name: varName },
              });
            }
          }
          // else: other initializers are ignored for naming in this rule
        }
      },
    };
  }
};

module.exports = constNamingRule;
