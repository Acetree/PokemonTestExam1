"use strict";

var pokemonData;
var maxPokedex = 151;
var pokedex = 1;
var thisPokemonData;
var maxHeight, maxWeight, maxHP, maxAttack, maxDefense, maxSPAttack, maxSPDefense, maxSpeed;

var puzzleCount = 1;
var heart = 5;
var score = 0;


var pokemonTypeColor = {
    'water': '#68cef8',
    'fighting': '#b92424',
    'poison': '#7D00D6',
    'electric': '#E7DC1B',
    'rock': '#9B9B9B',
    'grass': '#3ECC3F',
    'ice': '#67EEC1',
    'bug': '#4E7568',
    'dragon': '#FF8700',
    'ground': '#6F4B23',
    'fire': '#F74949',
    'psychic': '#C5C5C5'
}

$(function () {

    refreshHeart();
    refreshCount();
    refreshScore();

    $.ajax({
        url: "../pokemonTest/data/pokemon_data.csv",
        async: false,
        success: function (csvd) {
            pokemonData = $.csv.toObjects(csvd);
        },
        dataType: "text",
        complete: function () {
            console.log("data loaded");
        }
    });

    calculateMAXValue();
    gameInit();

    getANewRandomPokemon();

    function getANewRandomPokemon() {
        // random a pokemon
        pokedex = Math.floor(Math.random() * (maxPokedex - 1)) + 1;
        console.log(pokedex);
        $('.frame').css('background-image', 'url("data/pokemon_images/' + pokedex + '.png")');
        thisPokemonData = pokemonData[pokedex - 1];

        loadAnswer();
    }

    // interaction
    $('.brick').click(function () {

        if (heart == 1) {
            alert("Only one ❤️ left, could not see more parts...");
        } else {
            $(this).css('visibility', 'hidden');
            deductHeart();
        }
    });

    function deductHeart() {
        heart--;
        refreshHeart();
    }

    function addHeart() {
        heart++;
        refreshHeart();
    }

    function refreshHeart() {
        var html = 'Heart:';
        if (heart >= 1) {
            for (var i = 0; i < heart; i++) {
                html += ' ❤️';
            }
        } else {
            html += ' -';
        }
        $('.heart').html(html);
    }

    function refreshCount() {
        var html = 'Puzzle ' + puzzleCount;
        $('.title').html(html);
    }

    function refreshScore() {
        var html = 'Score: ' + score;
        $('.title-section .score').html(html);
    }


    $('#check-the-answer').click(function () {
        $('#section-who-i-am').css('display', 'none');
        $('.brick').fadeOut(100).delay(100);

        // check
        var answer = $('#input-answer').val();
        if (answer == thisPokemonData['name']) {
            addHeart();
            score++;
            refreshScore();
            $('.title').html('Congratulations!');
        } else {
            deductHeart();
            $('.title').html('Sorry...');
        }
        if (heart == 0) {
            $('#try-again').html('See your score');
        }

        $('#section-result').fadeIn(500);
    });

    $('#try-again').click(function () {
        if (heart >= 1) {
            $('#section-result').css('display', 'none');
            $('.brick').css('visibility', 'visible');

            // Refresh variables
            puzzleCount++;
            refreshCount();
            getANewRandomPokemon();
            $('input').val('');
            $('.brick').fadeIn(0);
            randomRemoveTwoBricks();
            $('#section-who-i-am').fadeIn(500);
        } else{
            $('.main-container').fadeOut(100);
            $('#score').html('Your score is '+score);
            $('.score-container').fadeIn(500);
        }

    });

    $('#restart').click(function(){
        window.location.href = "./test.html";
    });


    function gameInit() {

        var htmlOfBricks = '';
        for (var i = 0; i < 16; i++) {
            htmlOfBricks += '<div class="brick"></div>';
        }
        $('.frame').html(htmlOfBricks);

        randomRemoveTwoBricks();
    }

    function randomRemoveTwoBricks() {
        var whichBrick1 = Math.floor(Math.random() * 16);
        var whichBrick2 = whichBrick1;
        while (whichBrick2 == whichBrick1) {
            whichBrick2 = Math.floor(Math.random() * 16);
        }
        $('.brick').eq(whichBrick1).css('visibility', 'hidden');
        $('.brick').eq(whichBrick2).css('visibility', 'hidden');
    }

    function loadAnswer() {


        $('#pokemon_name').html(thisPokemonData['name']);
        $('#secret_answer').html(thisPokemonData['name']);
        $('#pokedex').html('# ' + pokedex);
        $('#pokemon_type').html(thisPokemonData['type1']);

        $('#pokemon_type').css('background-color', pokemonTypeColor[thisPokemonData['type1']]);

        $('#pokemon_classfication').html(thisPokemonData['classfication']);

        var height = thisPokemonData['height_m'];
        var heightDom = '#table_height';
        var weight = thisPokemonData['weight_kg'];
        var weightDom = '#table_weight';
        var hp = thisPokemonData['hp'];
        var hpDom = '#table_hp';
        var attack = thisPokemonData['attack'];
        var attackDom = '#table_attack';
        var defense = thisPokemonData['defense'];
        var defenseDom = '#table_defense';
        var spAttack = thisPokemonData['sp_attack'];
        var spAttackDom = '#table_sp_attack';
        var spDefense = thisPokemonData['sp_defense'];
        var spDefenseDom = '#table_sp_defense';
        var speed = thisPokemonData['speed'];
        var speedDom = '#table_speed';

        calculateVis(height, 3, heightDom);
        calculateVis(weight, 100, weightDom);
        calculateVis(hp, maxHP, hpDom);
        calculateVis(attack, maxAttack, attackDom);
        calculateVis(defense, maxDefense, defenseDom);
        calculateVis(spAttack, maxSPAttack, spAttackDom);
        calculateVis(spDefense, maxSPDefense, spDefenseDom);
        calculateVis(speed, maxSpeed, speedDom);


        // 20缺数据
        if (height != '') {
            $(heightDom).css('display', 'table-row block');
        } else {
            $(heightDom).css('display', 'none');
        }

        if (weight != '') {
            $(weightDom).css('display', 'table-row block');
        } else {
            $(weightDom).css('display', 'none');
        }


    }

    function calculateVis(data, maxData, dom) {
        var particle = 20;
        $(dom + ' > .td_item_data').html(data);
        var tmphtml = '';
        var heightRatio = Math.floor(data / maxData * particle);
        if (data / maxData > 1) {
            heightRatio = particle;
        }
        for (var i = 0; i < heightRatio; i++) {
            tmphtml += '<div class="block_hightlight"></div>';
        }
        for (var i = heightRatio; i < particle; i++) {
            tmphtml += '<div class="block_dark"></div>';
        }
        $(dom + ' > .td_item_data_vis').html(tmphtml);
    }

    function calculateMAXValue() {
        var pokemonWeightArray = new Array();
        var pokemonHeightArray = new Array();
        var pokemonHPArray = new Array();
        var pokemonAttackArray = new Array();
        var pokemonDefenseArray = new Array();
        var pokemonSPAttackArray = new Array();
        var pokemonSPDefenseArray = new Array();
        var pokemonSpeedArray = new Array();

        for (var i = 0; i < maxPokedex; i++) {
            pokemonHeightArray.push(pokemonData[i]['height_m']);
            pokemonWeightArray.push(pokemonData[i]['weight_kg']);
            pokemonHPArray.push(pokemonData[i]['hp']);
            pokemonAttackArray.push(pokemonData[i]['attack']);
            pokemonDefenseArray.push(pokemonData[i]['defense']);
            pokemonSPAttackArray.push(pokemonData[i]['sp_attack']);
            pokemonSPDefenseArray.push(pokemonData[i]['sp_defense']);
            pokemonSpeedArray.push(pokemonData[i]['speed']);
        }

        maxHeight = Math.max.apply(null, pokemonHeightArray);
        maxWeight = Math.max.apply(null, pokemonWeightArray);
        maxHP = Math.max.apply(null, pokemonHPArray);
        maxAttack = Math.max.apply(null, pokemonAttackArray);
        maxDefense = Math.max.apply(null, pokemonDefenseArray);
        maxSPAttack = Math.max.apply(null, pokemonSPAttackArray);
        maxSPDefense = Math.max.apply(null, pokemonSPDefenseArray);
        maxSpeed = Math.max.apply(null, pokemonSpeedArray);

    }

})


