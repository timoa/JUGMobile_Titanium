
(function() {
	
	// Menu fermé par défaut
	Ti.App.Properties.setBool('menuOpen', false);
	
	// Data
	var data = [
		{ item: L('event_title'), icon: "📅", rowId: 1 },
		{ item: L('speaker_title'), icon: "👥", rowId: 2 },
		{ item: L('partner_title'), icon: "👍", rowId: 3 },
		{ item: L('news_title'), icon: "📰", rowId: 4 },
		{ item: L('twitter_title'), icon: "", rowId: 5 },
		{ item: L('about_title'), icon: "", rowId: 6 }
	];
	
	
	var rowData = [];
		
	// Boucle pour ajouter les lignes à rowData
	for (var i = 0; i < data.length; i++) {
		var items = {
			item: data[i].item,
			icon: data[i].icon,
			rowId: data[i].rowId
		}
		var row = Alloy.createController('MenuRow', items).getView();		
		rowData.push(row);
	}
	
	// Ajout de rowData à menuList
	$.menuList.data = rowData;
	
	// Événement au click sur menuList
	$.menuList.addEventListener('click', function(e) {
		
		// TODO: Bug Android... Récupération de rowID via title. (e.rowData.title vers e.rowData.rowId)
	    if(OS_ANDROID) {
	    	var rowId = e.rowData.title;
	   } else {
	    	var rowId = e.rowData.rowId;
	    }
	
		// Events
	    if(rowId === 1) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuEvent');
	    	Ti.App.fireEvent('JUG:menuEvent');
	    }
	    
	    // Speakers
	    else if(rowId === 2) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuSpeaker');
	    	Ti.App.fireEvent('JUG:menuSpeaker');
	    }
	    
	    // Partners
	    else if(rowId === 3) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuPartner');
	    	Ti.App.fireEvent('JUG:menuPartner');
	    }
	    
	    // News
	    else if(rowId === 4) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuNews');
	    	Ti.App.fireEvent('JUG:menuNews');
	    }
	    
	    // Twitter
	    else if(rowId === 5) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuTwitter');
	    	Ti.App.fireEvent('JUG:menuTwitter');
	    }
	    
	    // About
	    else if(rowId === 6) {
	    	Ti.API.info('[---Menu---] fireEvent: JUG:menuAbout');
	    	Ti.App.fireEvent('JUG:menuAbout');
		}
		
		
		// Cache le Menu
    	Ti.App.fireEvent('JUG:hideMenu');
	    
	});
	
})();
