(function( $ ){
    var mock = {},
        ignores = {},
        ignoreAlls = {};
    
    $.ajaxMock = function( settings ){
        var url = settings.url,
            ignore = settings.ignore,
            ignoreAll = settings.ignoreAll;
        
        ignores[ url ] = ignore || [];
        ignoreAlls[ url ] = ignoreAll || false;
        if ( settings.data && !ignoreAll) {
            url+= "?" + $.param( settings.data );
        }
        mock[ url ] = settings;
    };
    
    $.ajax = function( options ){
        var url = options.url,
            ignore = ignores[ url ] || [],
            ignoreAll = ignoreAlls[ url ] || false,
            length = ignore.length,
            callback = options.success,
            data = options.data,
            settings, res, i;
        
        if (data && !ignoreAll) {
            for( i=0; i<length; i++ ){
                delete( data[ ignore[ i ] ]);
            }
            url+= "?" + $.param( data );
        }
        settings = mock[ url ] || {};
        res = settings.response || "";
        
        if(callback) setTimeout(function(){ callback(res); }, 100);
        
    };
    
    
})( jQuery );