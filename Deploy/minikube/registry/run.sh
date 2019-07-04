docker run \
--name registry-local \
-d \
-p 5000:5000 \
-v $PWD/data/registry:/var/lib/registry \
registry
