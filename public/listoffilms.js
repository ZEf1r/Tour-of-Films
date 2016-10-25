! function($) {
    $(function() {
        $('#search-by-title-button').click(function() {
            var c = $('#sbt-form').serialize();
            var d = 'http://www.omdbapi.com/?' + c;
            var g = $('#search-by-title-response');
            var b = $('#lof');
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: d,
                statusCode: {
                    403: function() {
                        g.find('pre').html('HTTP 403 Forbidden!')
                    }
                },
                success: function(a) {
                    //console.log("a:", a);
                    /*if (localStorage.getItem(a)) {
                        populateStorage();
                    } else {
                        localStorage.setItem(a)
                    }*/
                    var list = JSON.parse(a).Search;
                    console.log("totalResults:", Math.ceil(list.totalResults / 10));
                    g.find('pre').html(a.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                    //g.find('#se').html(JSON.stringify(list))
                    list.forEach(function(item) {
                        var pstr = (item.Poster == "N/A") ? "pstr_na.jpg" : item.Poster;
                        b.append("<tr><td><div class='poster' style='background-image:url(" + pstr + ")'><span id='imbd'>" + item.imdbID + "</span></div></td><td><span>" + item.Title + "</span></br><span>" + item.Type + ", " + item.Year + "</span></td></tr>")
                    });
                },
                complete: function() {
                    g.hide('slow')
                }
            })
        });
    })
}(window.jQuery);
//http://www.omdbapi.com/?i=tt0094712&plot=full&r=json