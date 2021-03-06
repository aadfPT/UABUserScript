// ==UserScript==
// @name         Uab Informática
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Muda os nomes das disciplinas
// @match        http://elearning.uab.pt/*
// @exclude        http://elearning.uab.pt/*.pdf
// @grant        none
// @require https://code.jquery.com/jquery-latest.js
// @credits Treewalker obtained from https://stackoverflow.com/a/24419809
// @downloadUrl  https://raw.githubusercontent.com/aadfPT/UABUserScript/master/script.js
// @updateUrl    https://raw.githubusercontent.com/aadfPT/UABUserScript/master/script.js
// ==/UserScript==
var t0 = performance.now();
var replaceArray = [
    [/^(00-Secretaria  Lic. Informática|2103-sec)/g, 'Secretaria'],
    [/^(00-O Café da Informática|2103-cafe)/g, 'Café'],
    [/^(Ambientação 449|AMB449)/g, 'Ambientação'],
    [/^(Arquitectura de Computadores 2017 01|21010_17_0[1-9])/g, 'Arquitectura de Computadores'],
    [/^(Arquitectura de Computadores \(Espaço Central\)|21010_17_00)/g, 'Arquitectura de Computadores (Central)'],
    [/^(Cálculo para Informática 2017 01|21157_17_0[1-9])/g, 'Cálculo para Informática'],
    [/^(Cálculo para Informática \(Espaço Central\) 2017|21157_17_00)/g, 'Cálculo para Informática (Central)'],
    [/^(Álgebra Linear I 2017 01|21002_17_0[1-9])/g, 'Álgebra Linear I'],
    [/^(Álgebra Linear I - Espaço Central 2017|21002_17_00)/g, 'Álgebra Linear I (Central)'],
    [/^(LaTeX 2017\/2018|LATEX_17)/g, 'LaTeX 2017/2018'],
    [/^(Programação 2017 01|21090_17_0[1-9])/g, 'Programação'],
    [/^(Programação - Espaço Central|21090_17_00)/g, 'Programação (Central)'],
    [/^(Sistemas Multimédia 2017 01|21110_17_0[1-9])/g, 'Sistemas Multimédia'],
    [/^(Fundamentos Base Dados 2017|21053_17_0[1-9])/g, 'Fundamentos Base Dados'],
    [/^(Fundamentos Base Dados - Espaço Central 2017|21053_17_00)/g, 'Fundamentos Base Dados (Central)'],
    [/^(Linguagens e Computação 2017|21078_17_0[1-9])/gi, 'Linguagens e Computação'],
    [/^(Elementos de Probabilidades e Estatística \(espaço central\) 2017|21037_17_00)/gi, 'Elementos de Probabilidades e Estatística (Central)'],
    [/^(Elementos de Probabilidades e Estatística 2017 01|21037_17_0[1-9])/gi, 'Elementos de Probabilidades e Estatística'],
    [/^(Matemática Finita 2017 01|21082_17_0[1-9])/gi, 'Matemática Finita'],
    [/^(Matemática Finita 2017 \(Meta Disciplina\)|21082_17_00)/gi, 'Matemática Finita (Central)'],
    [/^(Linguagens de Programação 2017 03|21077_17_0[1-9])/gi, 'Linguagens de Programação'],
    [/^(Modelação de Sistemas de Informação\(Espaço Central\) 2017|21177_17_00)/gi, 'Modelação de Sistemas de Informação (Central)'],
    [/^(Modelação de Sistemas de Informação 2017 01|21177_17_0[1-9])/gi, 'Modelação de Sistemas de Informação'],
    [/^(00-Coordenação Lic. Inf. - Estudantes|2103-coord)/g, 'Coordenação']
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
        var t1 = performance.now();
        console.log("Call took " + (t1 - t0) + " milliseconds.");
    });
})();