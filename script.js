// ==UserScript==
// @name         Uab Informática
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Muda os nomes das disciplinas
// @match        http://elearning.uab.pt/*
// @grant        none
// @require https://code.jquery.com/jquery-latest.js
// @credits Treewalker obtained from https://stackoverflow.com/a/24419809
// ==/UserScript==
var replaceArray = [
    [/00-Secretaria  Lic. Informática|2103-sec/gi, 'Secretaria'],
    [/00-O Café da Informática|2103-cafe/gi, 'Café'],
    [/00-Coordenação Lic. Inf. - Estudantes|2103-coord/gi, 'Coordenação']
    // etc.
];

function SearchAndReplace(target) {
    var numTerms = replaceArray.length;
    var txtWalker = document.createTreeWalker(
        target,
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
}
(function() {
    'use strict';
    $('body').hide();
    $(document).ready(function() {
        SearchAndReplace(document.body);
        $('body').show();
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var newNodes = mutation.addedNodes; // DOM NodeList
                if (newNodes !== null) { // If there are new nodes added
                    var $nodes = $(newNodes); // jQuery set
                    $nodes.each(function() {
                        //var $node = $( this );
                        SearchAndReplace(this);
                    });
                }
            });
        });
        var config = {
            subtree: true,
            attributes: false,
            childList: true,
            characterData: false
        };
        observer.observe(document.body, config);
    });
})();