# US postal locality snapshot

Source: [Vega Datasets zipcodes.csv](https://vega.github.io/vega-datasets/datasets/zipcodes/), derived from [GeoNames postal codes](https://www.geonames.org/export/zip/). Data license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Source Git blob d3df33e12be0d0544c95f1bd47005add4b7010be, acquired 2026-11-27. Ten JSON partitions retain only ZIP, city and state from 42,049 source rows; leading zeros preserved, coordinates and counties removed. All source rows had six fields and unique ZIPs. This is a reference snapshot, not a current USPS deliverability list, street geocoder or climate map. Some ZIPs are special-use or may have changed.

Exact ZIP to postal city/state; matching existing ZIP city reference preferred, otherwise a unique same-city/state reference; otherwise location-only general checks. Explicit conflicting comma-separated state refused; alternate postal city names not asserted as false. No nearest-city extrapolation, inferred parcel data, new runtime API, service, dependency or schedule. New assignments may remain unavailable until a reviewed refresh. Existing city reference estimates are not verified property measurements.

Attribution: GeoNames and Vega Datasets, CC BY 4.0. The derivative is filtered and repartitioned as described above.
