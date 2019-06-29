const dark = "dark-mode";
const light = "light-mode";
// put the opposite of the default value here, i.e. if you want the page in light theme by default, we put true
var dark_on = true;

function toggleDarkLight() {
    dark_on = !dark_on;
    var newClass = dark_on ? dark : light;

    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {

        var classList = all[i].classList;

        if (classList.contains(dark) || classList.contains(light)) {
            classList.remove(dark);
            classList.remove(light);
            classList.add(newClass);
        }

        if (classList.length == 0) {
            all[i].className = newClass;
        }
    }
}

toggleDarkLight();
