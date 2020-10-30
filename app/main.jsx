import React, { useState, useEffect } from 'react'

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'

import CountryTable from './components/countryTable'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}))

module.exports = () => {

  const classes = useStyles()

  const [searchBy, setSearchBy] = useState('name')

  const [name, setName] = useState('')

  const [capital, setCapital] = useState('')

  const [languages, setLanguages] = useState([])

  const [searchLangs, setSearchLangs] = useState([])

  const [region, setRegion] = useState('all')

  const [filterPopulation, setFilterPopulation] = useState(false)

  const [minPop, setMinPop] = useState(0)

  const [maxPop, setMaxPop] = useState(0)

  const [countries, setCountries] = useState([])

  const [filteredCountries, setFilteredCountries] = useState([])

  const [filtered, setFiltered] = useState(false)

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleCapitalChange = (event) => {
    setCapital(event.target.value)
  }

  const handleSearchLangsChange = (event) => {
    setSearchLangs(event.target.value)
  }

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const handleFilterPopChange = (event) => {
    setFilterPopulation(event.target.checked)
  }

  const handleMinPopChange = (event) => {
    setMinPop(event.target.value)
  }

  const handleMaxPopChange = (event) => {
    setMaxPop(event.target.value)
  }

  const handleSearch = () => {
    setFiltered(true)

    if (searchBy === 'name') {

      setFilteredCountries(countries.filter(country => {
        const nameMatch =
          country.name.toLowerCase().includes(name.toLowerCase())

        const regionMatch =
          region === 'all' || country.region.toLowerCase() === region

        const popMatch =
          filterPopulation === false ||
          (minPop <= country.population && maxPop >= country.population)

        return nameMatch && regionMatch && popMatch
      }))
    }
    else if (searchBy === 'capital') {
      setFilteredCountries(countries.filter(country => {
        const capitalMatch =
          country.capital.toLowerCase().includes(capital.toLowerCase())

        const regionMatch =
          region === 'all' || country.region.toLowerCase() === region

        const popMatch =
          filterPopulation === false ||
          (minPop <= country.population && maxPop >= country.population)

        return capitalMatch && regionMatch && popMatch
      }))
    }
    else {
      setFilteredCountries(countries.filter(country => {

        let langMatch = false

        if (searchLangs.length > 0) {
          for (let language of country.languages) {
            if (searchLangs.indexOf(language) > -1) {
              langMatch = true
              break
            }
          }
        }
        else {
          langMatch = true
        }

        const regionMatch =
          region === 'all' || country.region.toLowerCase() === region

        const popMatch =
          filterPopulation === false ||
          (minPop <= country.population && maxPop >= country.population)

        return langMatch && regionMatch && popMatch
      }))
    }
  }

  const handleShowAll = () => {
    setName('')
    setCapital('')
    setSearchLangs([])
    setRegion('all')
    setFilterPopulation(false)
    setFiltered(false)
  }

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(async resp => {
        const reader = resp.body.pipeThrough(new TextDecoderStream()).getReader()

        let data;
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          data = value
        }

        let countries = JSON.parse(data);

        let languagesSet = new Set()

        countries = countries.map(country => ({
          name: country.name,
          capital: country.capital,
          region: country.region,
          population: country.population,
          languages: country.languages.map(language => {
            languagesSet.add(language.name)
            return language.name
          }),
          timezones: country.timezones
        }))

        const allLanguages = Array.from(languagesSet)
        setLanguages(allLanguages)

        setCountries(countries)
      })

  }, [])

  let searchField = null
  if (searchBy === 'name') {
    searchField = <TextField
      id="name"
      label="Name"
      style={{ marginLeft: 32 }}
      type="search"
      value={name}
      onChange={handleNameChange}
    />
  } else if (searchBy === 'capital') {
    searchField = <TextField
      id="capital"
      label="Capital"
      style={{ marginLeft: 32 }}
      type="search"
      value={capital}
      onChange={handleCapitalChange}
    />
  }
  else {
    searchField =
      <FormControl
        className={classes.formControl}
        style={{ marginLeft: 32, width: 192 }}
      >
        <InputLabel id="searchLangsLabel">Languages</InputLabel>
        <Select
          labelId="searchLangsLabel"
          id="searchLangs"
          multiple
          value={searchLangs}
          onChange={handleSearchLangsChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {languages.map(language => (
            <MenuItem key={language} value={language}>
              <Checkbox checked={searchLangs.indexOf(language) > -1} />
              <ListItemText primary={language} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  }

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item sm={12} md={6}>
          <Box display='flex' height='100%' alignItems='flex-end'>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="searchById">Search By</InputLabel>
              <NativeSelect
                value={searchBy}
                onChange={handleSearchByChange}
                inputProps={{
                  name: 'searchBy',
                  id: 'searchById'
                }}
              >
                <option value='name'>Name</option>
                <option value='capital'>Captial</option>
                <option value='languages'>Languages</option>
              </NativeSelect>
            </FormControl>

            {searchField}
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: 32 }}
              onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={{ marginTop: 16 }}>
            <CardContent>
              <Typography color="textSecondary">
                Filter
              </Typography>
              <Box display='flex' alignItems='flex-end' >
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="regionId">Region</InputLabel>
                  <NativeSelect
                    value={region}
                    onChange={handleRegionChange}
                    inputProps={{
                      name: 'Region',
                      id: 'regionId'
                    }}
                  >
                    <option value='all'>All</option>
                    <option value='asia'>Asia</option>
                    <option value='europe'>Europe</option>
                    <option value='americas'>Americas</option>
                    <option value='africa'>Africa</option>
                    <option value='oceania'>Oceania</option>
                  </NativeSelect>
                </FormControl>
                <Box
                  border={1}
                  borderColor="grey.300"
                  p={2}
                  ml={2}
                  display='flex'
                  alignItems='flex-end'
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterPopulation}
                        onChange={handleFilterPopChange}
                        name="Population"
                        color="primary"
                      />
                    }
                    label="Population"
                  />
                  <TextField
                    id="minPopulation"
                    label="Min"
                    type="number"
                    value={minPop}
                    onChange={handleMinPopChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    disabled={!filterPopulation}
                  />
                  <TextField
                    id="maxPopulation"
                    label="Max"
                    type="number"
                    value={maxPop}
                    onChange={handleMaxPopChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    style={{ marginLeft: 16 }}
                    disabled={!filterPopulation}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleShowAll}
        style={{ marginTop: 32 }}
      >
        Show All
      </Button>
      <CountryTable countries={filtered ? filteredCountries : countries} />
    </Container >
  )
}