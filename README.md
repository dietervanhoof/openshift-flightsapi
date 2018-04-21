# Flights API
- `oc new-app . --strategy=docker --name=flightsapi -e BABEL_DISABLE_CACHE=1 -e PGHOST=postgresql-94-centos7 -e PGPORT=5432 -e PGUSER=admin -e PGPASSWORD=admin -e PGDATABASE=openshift`
- `oc start-build flightsapi --from-dir=.`
- Add environment variables to deployment (BABEL_DISABLE_CACHE, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
