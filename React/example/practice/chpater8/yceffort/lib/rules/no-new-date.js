/**
 * @fileoverview yceffort
 * @author yceffort
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "disallow use of the new Date()",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      message: 'new Date()는 클라이언트의 기기의 시간에 의존적이라 정확하지 않으니 현재 시간이 필요하다면, ServerDate()를 사용해주세요.'
    }
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      NewExpression: function(node){
        if(node.callee.name==='Date' && node.arguemtns.length ===0){
          context.report({
            node: node,
            messageid: 'message',
            fix: function(fixer){
              return fixer.replaceText(node, 'ServerDate()')
            }
          })
        }
      }
    };
  },
};
