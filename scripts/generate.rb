require 'json'

def get_gps_from_exif file
  gps = `exiftool -c "%+.6f" "#{file}" | grep GPS | grep Position`
  puts gps
  gps.scan(/(\-?\d+\.\d+)/)
end

def get_date_time file
  greps = `exiftool "#{file}" | grep "Date/Time Original"`
  if greps then
    scan = greps.scan(/(\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2})/)
  end
  if scan && scan[0] then
    return scan[0][0]
  end

end

path = "/Users/jake/Pictures/Phone/IMG_2016*.jpg"
all = Dir.glob(path)

array = []

all.each do |file|
  date = get_date_time(file)
  if gps = get_gps_from_exif(file)
    if gps.count == 2 # lat and long
      hash = {
        :coord => [ gps[0][0], gps[1][0] ],
        :date => date,
        :file => file
      }
      puts "#{file} @ #{date} @ #{hash[:coord]}"
      # puts hash
      array.push hash
    else 
      puts "#{file}"
    end
  end
end
puts JSON.generate(array)