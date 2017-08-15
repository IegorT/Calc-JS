
var obj = {
	up: "",
	down: "0"
};



function action(val) {
	switch(val){
		case "plusmn":
			if (obj.down !== "0") {
			return {"down": (obj.down.indexOf('-') === -1) ? addToStr("-", obj.down) : obj.down.slice(1), "up": obj.up};
			} else {
				return {"down": "0", "up": obj.up};
			} 
			break;
		case ".":
			return {"down": (obj.down.indexOf(".") === -1) ? addToStr(obj.down, ".") : obj.down, "up": obj.up};
			break;
		case "clear":
			return {"down": "0", "up": ""};
			break;
		case "clearLast":
			return {"down": "0", "up": obj.up};
			break;
		case "del": 
			return {"down": (obj.down > 1) ? obj.down.slice(0, -1) : "0", "up": obj.up};
			break;
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return {"down": (!isNaN(parseInt(val)) && obj.down !== "0" && obj.down !== Infinity) ? addToStr(obj.down, val) : addToStr('', val),
			"up": obj.up};
			break;
		case "*":
		case "/":
		case "-":
		case "+":
			return {"down": "0", "up": (obj.down !== "0") ? addToStr(obj.up + obj.down, val) : addToStr(obj.up.slice(0, -1), val)};
			break;
		case "x^2": 
			return {"down": round(obj.down**2), "up": obj.up};
			break;
		case "sqrt": 
			return {"down": round(Math.sqrt(obj.down)), "up": obj.up};
			break;
		case "log":
			return {"down": round(Math.log10(obj.down)), "up": obj.up};
			break;
		case "one/x":
			return {"down": round(1/Number(obj.down)), "up": obj.up};
			break;
		case "equal":
			return {"down": round(eval(obj.up+obj.down)), "up": ""};
			break;
	}

}	

function round(x) {
	x = x.toString()
	if (x.length > 10) {
		return numeral(x).format('0.00000e+0');
	} else {
		return x;
	}
}

function addToStr(str, val) {
	return str + val;
}

function toDisplay(obj) {
	$(".display .digit").text(obj.down);
	$(".display .actions").text(obj.up);
}

function buttonsSwitch() {
	if (obj.down == "0" && obj.up  == "") {
		$("button[id^=btn]").prop("disabled", false);
		$("button:not([id^=btn]), button[id=btn0]").prop("disabled", true);
		$("button[id='dot']").prop("disabled", false);
	} else if (obj.down.length >= 10 || obj.up.length >= 20) {
		$("button:not([id^=C])").prop("disabled", true);
		$("button[id='equal']").prop("disabled", false);
	//} else if (obj.up.match(/[+-/*]$/) && obj.down !== "0") {
		//$("button[id=substr], button[id=add], button[id=mult], button[id=divide]").prop("disabled", true);
	} else if (obj.up.match(/[/]$/) && obj.down == "0") {
		$("button[id=equal]").prop("disabled", true);
	} else {
		$("button").prop("disabled", false);
	}
} 


$(document).ready(function() {
	$("button").on("click", function() {
		var val = $(this).attr("value");
		obj = action(val);
		buttonsSwitch();
		console.log(obj);
		toDisplay(obj);
	});
});