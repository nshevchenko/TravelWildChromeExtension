import json

lines = {}



with open("countryCodes.json", "r") as ins:
    linez = ins.readlines()
    for line in linez:
        wds = line.split(' ')
        rest = ' '.join(wds[1:])
        lines[wds[0]] = rest

print(json.dumps(lines))
