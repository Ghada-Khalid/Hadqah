const Control = require('../models/ECCModel')
const mongoose = require('mongoose')

// Get all controls with proper error handling
const getAllControls = async (req, res) => {
  try {
    const controls = await Control.find()
      .select('domain subdomain referenceNumber clause type createdAt updatedAt')
      .sort({ referenceNumber: 1, domain: 1 })
      .lean()
    
    // Transform data to match frontend expectations
    const transformedControls = controls.map(control => ({
      _id: control._id,
      controlReferenceNumber: control.referenceNumber,
      controlClause: control.clause,
      controlType: control.type,
      domainName: control.domain,
      subdomainName: control.subdomain,
      createdAt: control.createdAt,
      updatedAt: control.updatedAt
    }))
    
    res.status(200).json(transformedControls)
  } catch (error) {
    console.error('Error fetching controls:', error)
    res.status(500).json({ 
      error: 'Failed to fetch controls',
      message: error.message 
    })
  }
}

// Get control by ID with proper validation
const getControlById = async (req, res) => {
  try {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid control ID format' })
    }

    const control = await Control.findById(id).lean()
    
    if (!control) {
      return res.status(404).json({ error: 'Control not found' })
    }

    // Transform data to match frontend expectations
    const transformedControl = {
      _id: control._id,
      controlReferenceNumber: control.referenceNumber,
      controlClause: control.clause,
      controlType: control.type,
      domainName: control.domain,
      subdomainName: control.subdomain,
      createdAt: control.createdAt,
      updatedAt: control.updatedAt
    }

    res.status(200).json(transformedControl)
  } catch (error) {
    console.error('Error fetching control by ID:', error)
    res.status(500).json({ 
      error: 'Failed to fetch control',
      message: error.message 
    })
  }
}

// Get controls grouped by domain (useful for statistics)
const getControlsByDomain = async (req, res) => {
  try {
    const controls = await Control.aggregate([
      {
        $group: {
          _id: '$domain',
          controls: {
            $push: {
              _id: '$_id',
              referenceNumber: '$referenceNumber',
              clause: '$clause',
              type: '$type',
              subdomain: '$subdomain'
            }
          },
          totalControls: { $sum: 1 }
        }
      },
      {
        $project: {
          domainName: '$_id',
          controls: 1,
          totalControls: 1,
          _id: 0
        }
      },
      {
        $sort: { domainName: 1 }
      }
    ])
    
    res.status(200).json(controls)
  } catch (error) {
    console.error('Error fetching controls by domain:', error)
    res.status(500).json({ 
      error: 'Failed to fetch controls by domain',
      message: error.message 
    })
  }
}

// Populate database with initial controls data (for setup)
const populateControls = async (req, res) => {
  try {
    // This would typically be called once to populate the database
    // You can implement this based on your ALL_DOMAINS data structure
    
    const existingCount = await Control.countDocuments()
    if (existingCount > 0) {
      return res.status(400).json({ 
        error: 'Controls already exist',
        message: `Found ${existingCount} existing controls` 
      })
    }
    
    // TODO: Implement population logic based on your requirements
    res.status(200).json({ 
      message: 'Population endpoint ready - implement based on your data source' 
    })
    
  } catch (error) {
    console.error('Error populating controls:', error)
    res.status(500).json({ 
      error: 'Failed to populate controls',
      message: error.message 
    })
  }
}

module.exports = { 
  getAllControls, 
  getControlById, 
  getControlsByDomain,
  populateControls 
}