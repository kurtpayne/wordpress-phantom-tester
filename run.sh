# CONFIG
BASE_URL=
OUTPUT=
USERNAME=
PASSWORD=

# Usage hint
usage()
{
cat << EOF
usage: $0 options

Run a phantomjs performance test on WordPress.

You will need the theme unit test data on the site.
http://codex.wordpress.org/Theme_Unit_Test

OPTIONS:
   -h      Show this message
   -b      Base URL (e.g. http://localhost/)
   -u      Admin username
   -p      Admin password
   -o      Output file (CSV formatted)
EOF
}

# Get options from input
while getopts "?hb:o:u:p:" OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         b)
             BASE_URL=$OPTARG
             ;;
         o)
             OUTPUT=$OPTARG
             ;;
         u)
             USERNAME=$OPTARG
             ;;
         p)
             PASSWORD=$OPTARG
             ;;
         ?)
             usage
             exit 1
             ;;
     esac
done
if [[ -z $BASE_URL ]] || [[ -z $OUTPUT ]] || [[ -z $USERNAME ]] || [[ -z $PASSWORD ]]
then
     usage
     exit 1
fi

# Run phantom
phantomjs			                  \
	--cookies-file=./cookies.txt      \
	--disk-cache=yes                  \
	--max-disk-cache-size=size=10240  \
	--ignore-ssl-errors=yes           \
	--load-images=yes                 \
	--local-to-remote-url-access=yes  \
	--debug=yes                       \
	--web-security=no                 \
wordpress.js $BASE_URL $USERNAME $PASSWORD $OUTPUT
