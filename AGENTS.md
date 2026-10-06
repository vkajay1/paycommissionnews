# Project architecture

- Keep MGID widget markup and navigation reload behavior in one shared ad component, with placements in the root layout so each widget appears once per page.
- Load the MGID site script once through the root head configuration so all page placements share the provider loader.