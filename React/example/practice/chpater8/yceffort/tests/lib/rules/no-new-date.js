/**
 * @fileoverview yceffort
 * @author yceffort
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-new-date"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-new-date", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {code: 'new Date(2010, 1, 1)',}
  ],

  invalid: [
    {
      code: "new Date()",
      errors: [{ message: rule.meta.messages.mesage}],
      output: 'ServerDate()'
    },
  ],
});
