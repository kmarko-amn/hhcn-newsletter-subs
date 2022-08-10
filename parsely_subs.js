try{
	var searchQuery = window.location.search;
	var urlParams = new URLSearchParams(searchQuery);
	var utm_source = urlParams.get('utm_source') || "";
	var audiences = JSON.parse(localStorage.lytics_segments);
	var isPremiumMember = audiences.includes("hhcn_members");
	var newsletter_utm_active = utm_source == 'hhcn-newsletter';
	var isMailchimpUser = audiences.includes("aud_hhcn_users_mailchimp_only");
	var isConnectedUser = audiences.includes("aud_hhcn_users_connected");
	var isNewsletterSubscriber = isMailchimpUser || isConnectedUser || newsletter_utm_active;
	console.log(isNewsletterSubscriber)
		window.PARSELY = window.PARSELY || {
			autotrack:false,
			onReady:function(){
				PARSELY.updateDefaults({
					data:{
						'premium_subscriber': isPremiumMember,
						'newsletter_subscriber': isNewsletterSubscriber
					}
				});
				PARSELY.beacon.trackPageView();
			}
		}
		
}
	catch(error){
		console.log(error)
	}