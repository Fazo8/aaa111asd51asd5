materialObj.getAllAnswerWidgets().forEach(function (otazka) {
  if (otazka.getWidgetClass() == "AbcdAnswerETestWidget") {
    var odpovede = otazka.alist[0];

    if (odpovede == undefined) {
      return;
    }

    var spravne_odpovede = otazka.props.correctAnswers
    for (answerid = 0; answerid < otazka.maxAnswerId; answerid++) {
      if (odpovede.children[answerid] == undefined) continue;
      if (spravne_odpovede.includes(odpovede.children[answerid].getAttribute("data-answerid"))) {
        odpovede.children[answerid].style = 'border: 2px solid #2196F3;';
      }
    }
  } else if (otazka.getWidgetClass() == "InputAnswerETestWidget") {
    var spravne_odpovede = otazka.props.correctAnswers;
    for (id = 0; id < spravne_odpovede.length; id++) {
      otazka.element.before("<br><br><span style='border: 2px solid #2196F3; background: white; color: black; padding: 5px; margin: 5px;'>" + spravne_odpovede[id] + " <button style='border: none; background: none; border-left: 2px solid #2196F3;' onclick='copy(`" + spravne_odpovede[id] + "`)'>Skopírovať</button></span><br><br>");
    }
  } else if (otazka.getWidgetClass() == "ConnectAnswerETestWidget") {
    var spravne_odpovede = otazka.props.pairs;
    var odpovede = "<div style='background-color: #2196F3; color: white; padding: 5px; margin: 0;'>Správne odpovede:<ol style='list-style-type: decimal; padding-left: 30px;'>"
    for (answerid = 0; answerid < spravne_odpovede.length; answerid++) {
      odpovede += "<li>" + spravne_odpovede[answerid].l;
      odpovede +=  spravne_odpovede[answerid].r + "</li>";
    }
    odpovede += "</ol></div>"
    otazka.element.before(odpovede);
    otazka.element[0].style = "border: 2px solid #2196F3;";
  } else if (otazka.getWidgetClass() == "OrderingAnswerETestWidget") {
    var spravne_odpovede = otazka.props.answers;
    var poradie = "<div style='background-color: #2196F3; color: white; padding: 5px; margin: 0;'>Správne poradie:<ol style='list-style-type: decimal; padding-left: 30px;'>";
    for (id = 0; id < spravne_odpovede.length; id++) {
      poradie += "<li>" + spravne_odpovede[id].text + "</li>";
    }
    poradie += "</ol></div>";
    otazka.element.before(poradie);
    otazka.element[0].style = "border: 2px solid #2196F3; padding: 15px;";
  } else {
    otazka.element.before("<div style='background: red; color: white; padding: 5px;'>Stymto ti nepomôžem ty kokot</div>");
    otazka.element[0].style = "border: 2px solid red;";
  }

  });

  function copy(spravne_odpovede) {
    navigator.clipboard.writeText(spravne_odpovede).then(function () {
      console.log('Skopírovanie úspešné!');
    }, function (err) {
      console.error('Nastala chyba pri kopírovaní:  ', err);
  });
}
