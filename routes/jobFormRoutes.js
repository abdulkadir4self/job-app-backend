const express = require('express');
const jobFormSchema = require('../schema/jobFormSchema');
const router = express.Router();




router.post('/' ,async (req,res)=>{
    let { jobName , jobPosition, jobContract, jobLocation } = req.body;
try {
  const createJobForm = await jobFormSchema.create({
    companyName : jobName,
    position: jobPosition,
    contract: jobContract,
    location: jobLocation,
  })
  res.json({
    status: 1,
    message: 'job created successfully',
    data: createJobForm,
  })
} 
catch (error) {
  console.log(error);
  res.json({
    status: 0,
    message: 'job could not be created',
    data: null,
  })
}
})

router.get('/' , async function(req,res){
  try {
    let allJobs = await jobFormSchema.find({});
    res.json({
      status:1,
      message: 'Fetched jobs Successfully',
      data: allJobs,
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'Fetching Failed',
      data: null,
    })
  }
})

router.get('/:id' , async function(req,res){
  try {
  let singleJob = await jobFormSchema.findById(req.params.id)
  res.json({
    status:1,
    message:' single job fetched successfully',
    data: singleJob,
  })
  } 
  catch (error) {
    res.json({
      status:0,
      message:' single job fetching failed',
      data: null
    })
  }
})

router.delete('/:id' , async function(req,res){
  try {
  let deleteJob = await jobFormSchema.findByIdAndDelete(req.params.id);
  res.json({
    status:1,
    message:'job deleted successfully',
    data: deleteJob
  })  
  } 
  catch (error) {
    res.json({
      status:0,
      message:'job could not be deleted ',
      data: null
    })  
  }
})


router.put('/:id' , async function(req,res){
  try {
    let { jobName , jobPosition, jobContract, jobLocation } = req.body;
    let updatedEmployee = await jobFormSchema.findByIdAndUpdate(req.params.id , {
        companyName : jobName,
        position: jobPosition,
        contract: jobContract,
        location: jobLocation,
    } , {new: true} , {insert:true})
    res.json({
      status:1,
      message: 'job updated successfully',
      data: updatedEmployee
    })
    
  } 
  catch (error) {
    res.json({
      status:0,
      message: 'job could not updated ',
      data: null
    })
  }
})






module.exports = router;