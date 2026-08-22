#!/bin/bash
echo "DOMAIN: ${CERTBOT_DOMAIN}" >> /tmp/certbot_prompt.txt
echo "VALUE: ${CERTBOT_VALIDATION}" >> /tmp/certbot_prompt.txt
while [ ! -f /tmp/certbot_continue.txt ]; do
  sleep 2
done
rm /tmp/certbot_continue.txt
