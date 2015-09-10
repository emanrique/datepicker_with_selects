var datepicker = (function(){

    var st = {
      day             : '#sel_day',
      month           : '#sel_month',
      year            : '#sel_year',
      tpl_option      : '<option value="{{ value }}">{{ name }}</option>',
      value_attribute : 'value',
      value_field     : '{{ value }}',
      name_field      : '{{ name }}'
    };

    var MONTHS = [{
        name: 'Enero',
        value: '1'
        },{
        name: 'Febrero',
        value: '2'
        },{
        name: 'Marzo',
        value: '3'
        },{
        name: 'Abril',
        value: '4'
        },{
        name: 'Mayo',
        value: '5'
        },{
        name: 'Junio',
        value: '6'
        },{
        name: 'Julio',
        value: '7'
        },{
        name: 'Agosto',
        value: '8'
        },{
        name: 'Setiembre',
        value: '9'
        },{
        name: 'Octubre',
        value: '10'
        },{
        name: 'Noviembre',
        value: '11'
        },{
        name: 'Diciembre',
        value: '12'
        }];

    var dom = {}
    var catchDom = function() {
      dom.day = $(st.day);
      dom.month = $(st.month);
      dom.year = $(st.year);
    };

    var afterCatchDom = function () {
      fn.prepareDatePicker(fn.prepareEvents);
    };


    var events = {
      changeMonth : function () {
        var selectedYear,
            selectedMonth,
            selectedDay;

        selectedYear = fn.getYear(),
        selectedMonth = fn.getMonth(),
        selected_day = fn.getDay();

      },
      changeYear : function () {
          var selectedYear,
            selectedMonth;

          selectedYear = fn.getYear(),
          selectedMonth = fn.getMonth(),

          fn.fillDays(selectedMonth, selectedYear);
      }
    };

    var fn = {
      prepareEvents : function () {
        dom.month.on('change', events.changeMonth);
        dom.year.on('change', events.changeYear);
      },
      prepareDatePicker: function (callback) {        
        fn.fillYears();
        fn.fillMonths();
        fn.fillDays();
        callback();
      },
      setDate: function (date) {
          if (typeof date !== 'string') {
             return;
          }

          date = date.split('/');

          fn.setYear(date[2]);
          fn.setMonth(date[1]);
          fn.setDay(date[0]);

      },
      getDate: function () {
        date = fn.getYear() + '/' + fn.getMonth() + '/' + fn.getDay();
        return date;
      },
      setYear : function (year) {
        dom.year.val(year)
      },
      getYear: function () {
        return dom.year.val();
      },
      setMonth : function (month) {

        dom.month.val(month)
      },
      getMonth : function () {
        return dom.month.val();
      },
      setDay : function (day) {
        dom.day.val(day)
      },
      getDay : function () {
        return dom.day.val();
      },
      fillDays: function (month, year) {
        var available_days = 30,
            item = 1,
            day = "",
            dayOptionHTML = "",
            daysListOptionsHTML = "<option value=\"0\">----</option>";
            last_selected_day = "";

        last_selected_day = fn.getDay();
        available_days = 31;

        for (item; item <= available_days; item++) {
          var day = item;
          day = fn.getFormatedValue(day);
          dayOptionHTML = fn.renderTemplate(day, day);
          daysListOptionsHTML =  daysListOptionsHTML + dayOptionHTML;
        }
        dom.day.html(daysListOptionsHTML);
        fn.setDay(last_selected_day);
      },
      fillMonths : function () {
        var item = null,
            monthsListOptionsHTML = "<option value=\"0\">-----</option>";
            monthOptionHTML = "";

        for (item in MONTHS) {
          var month = null,
              month_value = "",
              month_name = "";

          month_value = MONTHS[item].value;
          month_name = MONTHS[item].name;
          monthOptionHTML = fn.renderTemplate(month_value, month_name);
          monthsListOptionsHTML = monthsListOptionsHTML + monthOptionHTML ;
        }
        dom.month.html(monthsListOptionsHTML);
      },
      fillYears : function () {
        var years = fn.getAllAvailableYears(),
            item = null,
            yearOptionHTML = "",
            yearsListOptionsHTML = "";

        for (item in years) {
          var year = null;

          year = years[item];
          yearOptionHTML = fn.renderTemplate(year, year);
          yearsListOptionsHTML = yearOptionHTML + yearsListOptionsHTML;
        }
        yearsListOptionsHTML =  "<option value=\"0\">----</option>" + yearsListOptionsHTML;
        dom.year.html(yearsListOptionsHTML);
      },
      getAllAvailableYears : function () {
         var years = [],
             i = 0,
             min_years = 1910,
             max_years = fn.getMaxYear();

          for (i = min_years; i <= max_years; i ++ ) {
            years.push(i);
          }

        return years;
      },
      getMaxYear : function () {
          var currentYear = new Date().getFullYear();
          return currentYear;
      },
      getFormatedValue : function (value) {
        var formatedValue = "";

        value = value + "";

        if (value.length == 1) {
          formatedValue =  '0' + value;
        } else {
          formatedValue = value + "";
        }
        return formatedValue;
      },
      getDaysInMonth: function (month, year) {
        var days = 0;

        if (month == 2) {
          days = 28 + fn.isLeapYear(year)
        } else {
          days = 31 - (month - 1) % 7 % 2;
        }
        return days;
      },
      isLeapYear : function (year) {
        if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
          return 1;
        }
        return 0;
      },
      renderTemplate: function (value, name) {
        var option_html = "";
        option_html = st.tpl_option.split(st.value_field).join(value);
        option_html = option_html.split(st.name_field).join(name);

        return option_html;
      }
    }

    var initialize = function(){
      catchDom();
      afterCatchDom();};

    return {
        init    : initialize,
        getDate : fn.getDate,
        setDate : fn.setDate

    }

})();

$(document).on('ready', function () {
    datepicker.init();

})
