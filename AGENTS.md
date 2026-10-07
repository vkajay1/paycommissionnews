# Project architecture

- Keep MGID markup and navigation reload behavior in one shared ad component; root layout owns global placements, homepage components own section/mobile slots, and ArticleMgidAds owns paragraph/FAQ slots so manual and shared article pages receive consistent placements without duplicate injection.
- Load the MGID site script once through the root head configuration so all page placements share the provider loader.