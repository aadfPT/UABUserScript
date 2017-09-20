// ==UserScript==
// @name         Uab Informática
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Muda os nomes das disciplinas
// @match        http://elearning.uab.pt/*
// @grant        none
// @require https://code.jquery.com/jquery-latest.js
// ==/UserScript==
var replaceArray = [
    [/00-Secretaria  Lic. Informática/gi, 'Secretaria'],
    [/00-O Café da Informática/gi, 'Café'],
    [/00-Coordenação Lic. Inf. - Estudantes/gi, 'Coordenação']
    // etc.
];
(function() {
    'use strict';
    $('body').hide();
    $(document).ready(function() {
        var numTerms = replaceArray.length;
        var txtWalker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT, {
                acceptNode: function(node) {
                    //-- Skip whitespace-only nodes
                    if (node.nodeValue.trim())
                        return NodeFilter.FILTER_ACCEPT;

                    return NodeFilter.FILTER_SKIP;
                }
            },
            false
        );
        var txtNode = null;
        txtNode = txtWalker.nextNode();
        while (txtNode) {
            var oldTxt = txtNode.nodeValue;

            for (var J = 0; J < numTerms; J++) {
                oldTxt = oldTxt.replace(replaceArray[J][0], replaceArray[J][1]);
            }
            txtNode.nodeValue = oldTxt;
            txtNode = txtWalker.nextNode();
        }
        $('body').show();
    });
})();