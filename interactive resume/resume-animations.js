$(document).ready(function () {
    let codingButton = $("#skill1");
    let youthLeadershipButton = $("#skill2");
    let teamworkButton = $("#skill3");
    let hiddenDiv1 = $("#hidden1");
    let hiddenDiv2 = $("#hidden2");
    let hiddenDiv3 = $("#hidden3");
    codingButton.hover(function () {
        $("#codeText").html("Click to learn more about my coding skills!");
    }, function () {
        $("#codeText").html("Coding and Instruction");
    })
    youthLeadershipButton.hover(function () {
        $("#youthText").html("Click to learn more about my youth leadership skills!");
    }, function () {
        $("#youthText").html("Youth Leadership and Mentoring");
    })
    teamworkButton.hover(function () {
        $("#teamText").html("Click to learn more about my teamwork skills!");
    }, function () {
        $("#teamText").html("Teamwork");
    })
    codingButton.click(unHideDiv1)
    youthLeadershipButton.click(unHideDiv2)
    teamworkButton.click(unHideDiv3)
    function unHideDiv1() {
        if (hiddenDiv1.css("display") === "none" && codingButton.css("backgroundColor") === "rgb(0, 128, 128)") {
            hiddenDiv1.slideDown(500);
            codingButton.css("backgroundColor", "rgb(0, 77, 77)");
            hiddenDiv2.hide();
            youthLeadershipButton.css("backgroundColor", "rgb(0, 128, 128)");
            hiddenDiv3.hide();
            teamworkButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
        else {
            hiddenDiv1.slideUp(500);
            codingButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
    }
    function unHideDiv2() {
        if (hiddenDiv2.css("display") === "none" && youthLeadershipButton.css("backgroundColor") === "rgb(0, 128, 128)") {
            hiddenDiv2.slideDown(500);
            youthLeadershipButton.css("backgroundColor", "rgb(0, 77, 77)");
            hiddenDiv1.hide();
            codingButton.css("backgroundColor", "rgb(0, 128, 128)");
            hiddenDiv3.hide();
            teamworkButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
        else {
            hiddenDiv2.slideUp(500);
            youthLeadershipButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
    }
    function unHideDiv3() {
        if (hiddenDiv3.css("display") === "none" && teamworkButton.css("backgroundColor") === "rgb(0, 128, 128)") {
            hiddenDiv3.slideDown(500);
            teamworkButton.css("backgroundColor", "rgb(0, 77, 77)");
            hiddenDiv1.hide();
            codingButton.css("backgroundColor", "rgb(0, 128, 128)");
            hiddenDiv2.hide();
            youthLeadershipButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
        else {
            hiddenDiv3.slideUp(500);
            teamworkButton.css("backgroundColor", "rgb(0, 128, 128)");
        }
    }
});